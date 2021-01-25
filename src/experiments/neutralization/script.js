export default {
  name: '酸碱中和反应',
  id: 1,
  comment: '',
  paragraphs: [
    {
      id: '初始画面',
      talks: [
        '嘿~！这不是新来的实验家吗？你好呀！'
        // '很高兴你能接受这次【酸碱中和反应实验】的挑战任务。',
        // '嗯？你问我是谁？不好意思忘记自我介绍了Σ(0△0||) ！',
        // '我呢~是这次实验的导航精灵，也可以把我当作是你的小助手哦，在这次任务中我会尽全力帮助你完成这次实验的。 ',
        // '这次的任务需要我们掌握正确的实验仪器操作方法，并学会利用不同的酸碱指示剂，观察与探究酸溶液与碱溶液之间发生的化学现象与反应。',
        // '那么聪明勇敢的实验家，准备好开始这次的实验旅程了吗？'
      ],
      responses: [
        { name: '我准备好了！', feedbacks: ['很好！很有精神！'] },
        {
          name: '看起来好难...',
          feedbacks: ['嘿~放轻松，我可是很相信实验家的实力的，我也会帮助你一起完成这次任务的。']
        }
      ]
    },
    {
      id: '选择酸溶液',
      talks: [
        '事不宜迟，我们先试着开始实验的第一步吧。'
        // '嘛~，因为这次的实验是【酸碱中和反应实验】，那么酸溶液自然是必不可少的。',
        // '这次我特意为你准备了两种酸性溶液供你选择哦，你想使用哪一种酸性溶液呢？'
      ],
      responses: [
        { name: '稀盐酸', feedbacks: ['稀盐酸~！就决定是你了！'] },
        { name: '稀硫酸', feedbacks: ['现在轮到你了~！稀硫酸~！'] }
      ]
    },
    {
      id: '夸奖',
      talks: ['呼~好啦，需要的酸溶液已经被召唤出来了，顺便一些要用到的实验器材也帮你准备好啦。'],
      responses: [
        {
          name: '干的漂亮！',
          feedbacks: ["谢谢夸奖~！虽然这是我应该做的事情啦，不过不介意的话也可以多夸夸我哦o(〃'▽'〃)o。"]
        },
        { name: '谢谢你！', feedbacks: ['不客气哦~，能帮助到实验师是我应该做的事情啦。'] }
      ]
    },
    {
      id: '滴加酸溶液1',
      talks: [
        '现在酸溶液已经选择好啦，这一次我先帮你把酸溶液滴入试管中吧~。',
        '接下来请一定要注意观察下面的实验操作哦。'
      ]
    },
    {
      id: '滴加酸溶液2',
      talks: [
        '好啦，现在酸溶液已经滴入完成了，不知道实验师看清了刚才的实验操作了吗？',
        '接下来我要开始提问了。',
        '聪明的实验师，你觉得刚才滴入溶液的操作是规范的吗？'
      ],
      responses: [
        { name: '我觉得非常规范', feedbacks: ['很遗憾，没有回答正确哦。'] },
        { name: '我感觉有一处不对劲..', feedbacks: ['bingo~！回答正确！'] },
        { name: '我想再看一遍', feedbacks: ['没问题，那这次可要注意观察噢！'] , repeat: true}
      ]
    },
    {
      id: '滴管滴加解释',
      talks: [
        '在刚才滴入酸溶液的时候，我们将胶头滴管伸入了**试管的内部**，这一步的实验操作其实是**不规范**的。',
        // '要注意，在滴液时如果将胶头滴管伸入试管的内部，很容易使胶头滴管**碰到试管的内壁，导致胶头滴管被污染**。',
        // '并且在下次使用被污染的胶头滴管时，还会影响到其他的药品，造成交叉污染，这样不仅会导致实验结果受到干扰，严重的还会引发化学事故哦。',
        // '所以在使用胶头滴管滴液时，一定要注意将其**竖直悬空于试管之上，不能伸入或接触试管**哦。'
      ]
    },
    {
      id: '选择碱溶液1',
      talks: [
        '既然酸溶液已经滴入完毕，接下来就该轮到**碱溶液**的选择了。',
        '同样的，这次也有两种碱溶液可以选择哦，分别是氢氧化钠溶液和氢氧化钡溶液。',
        '实验师，你想使用哪一种碱溶液与刚才的酸溶液发生反应呢？'
      ],
      responses: [
        {name: '氢氧化钠溶液', feedbacks: ['氢氧化钠溶液对吗？没问题，接下来就看我的吧~！']},
        {name: '氢氧化钡溶液', feedbacks: ['氢氧化钡溶液对吗？没问题，接下来就看我的吧~！']}
      ]
    },
    {
      id: '碱溶液-氢氧化钠',
      talks: ['呼~每次使用召唤还蛮累的，不过你需要的**氢氧化钠溶液**已经被召唤出来咯。']
    },
    {
      id:'碱溶液-氢氧化钡',
      talks: ['呼~每次使用召唤还蛮累的，不过你需要的**氢氧化钡溶液**已经被召唤出来咯。']
    },
    {
      id: '滴加碱溶液',
      talks: [
        '好了实验师，现在试着利用胶头滴管，将刚才新增的碱溶液逐滴地滴入试管里面吧。',
        '在滴入碱溶液的过程中，可以观察与思考酸溶液和碱溶液发生了什么样的变化哦。'
      ]
    },
    {
      id: '滴加酸溶液1',
      talks: ['现在酸溶液已经选择好啦，这一次我先帮你把酸溶液滴入试管中吧~。', '接下来请一定要注意观察下面的实验操作哦。']
    },
    {
      id: '滴加酸溶液2',
      talks: [
        '好啦，现在酸溶液已经滴入完成了，不知道实验师看清了刚才的实验操作了吗？',
        '接下来我要开始提问了。',
        '聪明的实验师，你觉得刚才滴入溶液的操作是规范的吗？'
      ],
      responses: [
        { name: '我觉得非常规范', feedbacks: ['很遗憾，没有回答正确哦。'] },
        { name: '我感觉有一处不对劲..', feedbacks: ['bingo~！回答正确！'] },
        { name: '我想再看一遍', feedbacks: ['行'] }
      ]
    }
  ]
}