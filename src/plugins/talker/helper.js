export const isTalkingOrReplyingFinished = (paragraph, pointer) => {
  if (pointer.choice == null) {
    // talk 环节
    if (paragraph.talks.length == pointer.talk + 1) return true
    else return false
  } else {
    // reply 环节
    if (!paragraph.choices[pointer.choice].replies) return true
    if (paragraph.choices[pointer.choice].replies.length == pointer.reply + 1) return true
    else return false
  }
}

export const isParagraphsExhausted = (script, pointer) => {
  if (script.paragraphs.length == pointer.paragraph + 1) {
    return true
  } else {
    return false
  }
}

export const outputHookFinder = (paragraph, pointer) => {
  return (h) => {
    if (h.choice) return false
    if (!isOutputHook(h)) return false
    if (h.paragraph != paragraph.id) return false

    let matchedIndex
    // talk
    if (h.talk >= 0 || (h.talk === 'last' && pointer.talk != null)) {
      if (h.talk === 'last') h.talk = paragraph.talks.length - 1
      matchedIndex = h.talk == pointer.talk
    }
    // reply
    else if (h.reply && pointer.reply != null) {
      // 不指定选项
      if (h.reply.choice === 'any') {
        if (h.reply.index === 'last') {
          h.reply.index = paragraph.choices[pointer.choice].replies.length - 1
        }
        matchedIndex = h.reply.index == pointer.reply
      }
      // 指定选项
      else {
        let choice = h.reply.choice
        if (h.reply.choice === 'last') {
          choice = paragraph.choices.length - 1
        }
        if (h.reply.index === 'last') {
          h.reply.index = paragraph.choices[choice].replies?.length - 1
        }
        matchedIndex = h.reply.index == pointer.reply && choice == pointer.choice
      }
    }
    return matchedIndex
  }
}

export const inputHookFinder = (paragraph, pointer) => {
  return (h) => {
    if (h.choice == undefined) return false
    if (h.paragraph != paragraph.id) return false

    let matchedChoiceIndex
    if (h.choice === 'any') {
      matchedChoiceIndex = true
    } else {
      if (h.choice === 'last') h.choice = paragraph.choices.length - 1
      matchedChoiceIndex = h.choice == pointer.choice
    }
    return matchedChoiceIndex
  }
}

const isOutputHook = (h) => {
  return h.talk >= 0 || h.talk === 'last' || h.reply
}
