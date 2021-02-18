<template>
  <div class="talker" v-show="showBubble">
    <talker-bubble-vue @click="shouldGoNext" :clickable="!this.typer.typing">
      <p class="bubble-text" v-html="typed"></p>
    </talker-bubble-vue>
    <transition name="slide">
      <div class="choices" v-if="showChoicesView">
        <div
          v-for="(choice, index) in paragraph.choices"
          :key="choice.name"
          @click="reply(choice, index)"
          class="choice"
        >
          {{ choice.name }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Typer from 'dom-typer'
import TalkerBubbleVue from './TalkerBubble.vue'
import {
  isTalkingOrReplyingFinished,
  isParagraphsExhausted,
  outputHookFinder,
  inputHookFinder,
} from './helper'

export default {
  components: { TalkerBubbleVue },

  props: {
    script: Object,
    hooks: Array,
    end: Function,
  },

  data() {
    return {
      paragraph: null,
      mode: null, // 'IMPERATIVE_MODE' or 'LISTEN_MODE'
      typed: '',
      typer: new Typer('initial'),
      showChoicesView: false,
      showBubble: true,
      pointer: {
        paragraph: null,
        talk: null,
        choice: null,
        reply: null,
      },
    }
  },

  methods: {
    mount(cb) {
      typeof cb === 'function' && cb.call(this)
      return new Promise((resolve) => {
        this.resolve = resolve
      })
    },

    talk() {
      if (this.pointer.choice == null) {
        // 指针内 choice 为 null, 则说明当前进行 talk 环节
        if (this.pointer.talk == null) {
          this.pointer.reply = null
          this.pointer.talk = 0
        } else {
          this.pointer.talk++
        }
        this.typer.targetString = this.paragraph.talks[this.pointer.talk]
      } else {
        // 指针内 choice 非 null, 则说明当前进行 reply 环节
        if (this.pointer.reply == null) {
          this.pointer.talk = null
          this.pointer.reply = 0
        } else {
          this.pointer.reply++
        }
        this.typer.targetString = this.paragraph.choices[this.pointer.choice].replies[this.pointer.reply]
      }

      this.typer.type((str) => (this.typed = str))
    },

    shouldGoNext() {
      const outputHook =
        this.mode == 'LISTEN_MODE' &&
        this.hooks &&
        this.hooks.find(outputHookFinder(this.paragraph, this.pointer))
      if (outputHook && !outputHook.resolved) {
        this.hide()
        outputHook.resolved = true
        outputHook.method({
          next: this.next,
          paragraph: this.paragraph,
          goto: this.goto,
          restart: this.restart,
        })
      } else this.next()
    },

    next() {
      this.show()
      if (isTalkingOrReplyingFinished(this.paragraph, this.pointer)) {
        if (this.pointer.choice == null) {
          // talk 环节
          // 判断有没有后续的玩家选择环节（choices），如果有则弹出选择 UI
          if (this.paragraph.choices && this.paragraph.choices.length > 0) {
            this.showChoice()
          } else {
            // 如果没有 choices 环节，则结束这个段落的对话
            this.closeParagraph()
          }
        } else {
          this.closeParagraph(this.pointer.choice)
        }
      }

      // 如果没完成，继续打字队列
      else {
        this.talk()
      }
    },

    closeParagraph(msg) {
      if (this.mode == 'IMPERATIVE_MODE') {
        this.destroy(msg)
      } else if (this.mode == 'LISTEN_MODE') {
        if (isParagraphsExhausted(this.script, this.pointer)) {
          this.destroy()
        } else {
          this.pointer.talk = null
          this.pointer.choice = null
          this.pointer.reply = null
          this.paragraph = this.script.paragraphs[++this.pointer.paragraph]
          this.talk()
        }
      }
    },

    destroy(msg) {
      if (this.end) this.end()
      this.resolve(msg)
      document.body.removeChild(document.getElementById('talker'))
      this.$destroy()
    },

    showChoice() {
      this.showChoicesView = true
    },

    hideChoice() {
      this.showChoicesView = false
    },

    hide() {
      this.showBubble = false
    },

    show() {
      this.showBubble = true
    },

    reply(choice, index) {
      this.hideChoice()
      this.pointer.choice = index
      this.pointer.reply = -1
      const inputHook =
        this.mode == 'LISTEN_MODE' &&
        this.hooks &&
        this.hooks.find(inputHookFinder(this.paragraph, this.pointer))
      if (inputHook) {
        this.hide()
        inputHook.method({
          next: this.next,
          paragraph: this.paragraph,
          goto: this.goto,
          restart: this.restart,
        })
      } else {
        if (choice.replies && choice.replies.length > 0) {
          this.talk()
        } else {
          this.closeParagraph(index)
        }
      }
    },

    restart() {
      Object.assign(this.pointer, { talk: null, choice: null, reply: null })
      this.hooks && this.hooks.forEach((h) => delete h.resolved)
      this.show()
      this.talk()
    },

    goto({ paragraph, talk, reply }) {
      if (paragraph) {
        const _paragraph = this.script.paragraphs.find((p) => p.id === paragraph)
        this.paragraph = _paragraph
        this.pointer.paragraph = _paragraph.index
      }
      if (talk >= 0) {
        Object.assign(this.pointer, { talk: talk - 1, choice: null, reply: null })
      } else if (talk === 'last') {
        Object.assign(this.pointer, { talk: this.paragraph.talks.length - 2, choice: null, reply: null })
      } else if (reply) {
        const { choice, index } = reply
        Object.assign(this.pointer, { talk: null, choice, reply: index - 1 })
      } else {
        Object.assign(this.pointer, { talk: null, choice: null, reply: null })
      }
      this.hooks && this.hooks.forEach((h) => delete h.resolved)
      this.show()
      this.talk()
    },
  },

  beforeMount() {
    if (this.paragraph) {
      this.mode = 'IMPERATIVE_MODE'
    } else if (this.script) {
      this.mode = 'LISTEN_MODE'
    }
  },

  mounted() {
    if (this.mode == 'IMPERATIVE_MODE') {
      console.log('talker: 命令模式')
      this.talk()
    } else {
      console.log('talker: 监听模式')
      this.script.paragraphs.forEach((p, index) => (p.index = index))
      this.pointer.paragraph = 0
      this.paragraph = this.script.paragraphs[0]
      this.talk()
    }
  },
}
</script>

<style scoped lang="scss">
.talker {
  width: 80%;
  min-height: 30%;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column-reverse;
  padding: 20px;
  
  .bubble-text {
    flex-grow: 1;
    margin: 16px;
  }

  .choices {
    align-self: flex-end;
    font-size: 2.2vmin;
    margin: 5px 0;
    .choice {
      background: rgb(247, 218, 166);
      padding: 5px 50px;
      margin: 5px 0;
      cursor: pointer;
    }
  }
}
</style>