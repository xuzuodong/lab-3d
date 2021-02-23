import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Paragraph {
    id: String
    talks: Array<String>
    choices?: Array<{ name: String; replies?: Array<String> }>
  }

  interface Script {
    name: String
    paragraphs: Array<Paragraph>
  }

  interface TalkerTools {
    /**让剧情对话继续 */
    next?: () => void
    
    /**指定前往某个段落的某处对话 */
    goto?: (options: gotoOptions) => void

    /**重新开始当前段落 */
    restart?: () => void

    /**当前段落对象 */
    paragraph?: Paragraph

    /**用户做出选择后，隐藏用户选择的那个选项 */
    hideChoice?: () => void
  }

  interface gotoOptions {
    /**要前往的段落 id */
    paragraph?: String

    /**要前往的 talk */
    talk?: Number | 'last'

    /**要前往的 reply */
    reply?: { choice: Number | 'last'; index: Number | 'last' }
  }

  interface Hook {
    /**段落的 id */
    paragraph: String

    /**指定监听用户选了哪个 choice，值从 0 开始计*/
    choice?: Number | 'last' | 'any'

    /**指定监听哪句 talk，值从 0 开始计*/
    talk?: Number | 'last'

    /**指定要监听那个 reply*/
    reply?: { choice: Number | 'last' | 'any'; index: Number | 'last' }

    /**指定监听到后需要做什么 */
    method: (tools: TalkerTools) => void
  }

  interface TalkerOptions {
    /**脚本对象*/
    script: Script

    /**一系列监听器，用来监听对话，触发事件 */
    hooks: Array<Hook>

    /**所有对话结束后触发事件 */
    end: () => void
  }

  interface Vue {
    /**
     * 创建剧情对话
     *
     * @param {TalkerOptions} options - 剧情对话的选项，包括脚本、监听钩子等
     */
    $talker: (options: TalkerOptions) => void
  }
}
