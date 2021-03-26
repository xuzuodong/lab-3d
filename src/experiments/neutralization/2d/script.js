export default {
  name: '酸碱中和反应',
  id: 1,
  comment: '',
  paragraphs: [
    {
      id: '初始画面',
      talks: [
        '嘿！这不是新来的实验家吗？你好呀！',
        '很高兴你能接受这次**酸碱中和反应实验**的挑战任务。',
        '我是这次实验的导航精灵，也可以把我当作是你的小助手哦，在这次任务中我会尽全力帮助你完成这次实验的。',
        '这次的任务需要我们掌握正确的实验仪器操作方法，并学会利用不同的酸碱指示剂，观察与探究酸溶液与碱溶液之间发生的化学现象与反应。',
        '那么聪明勇敢的实验家，准备好开始这次的实验旅程了吗？'
      ],
      choices: [
        { name: '我准备好了！', replies: ['很好！很有精神！'] },
        {
          name: '看起来好难...',
          replies: ['嘿，放轻松，我可是很相信实验家的实力的，我也会帮助你一起完成这次任务的。']
        }
      ]
    },

    {
      // 问题情景
    },

    {
      id: '选择酸溶液',
      talks: [
        '事不宜迟，我们先试着开始实验的第一步吧。',
        '因为这次的实验是**酸碱中和反应实验**，那么酸溶液自然是必不可少的。',
        '这次我特意为你准备了两种酸性溶液供你选择哦，你想使用哪一种酸性溶液呢？'
      ],
      choices: [
        {
          name: '稀盐酸',
          replies: [
            '**稀盐酸！**就决定是你了！',
            '稀盐酸是一种无色澄清的酸性溶液，它具有**强酸性**，是日常生活中常用的洁厕灵与除锈剂的主要成分，也是我们身体中胃酸的主要成分。'
          ]
        },
        {
          name: '醋酸溶液',
          replies: [
            ' 轮到你了！**醋酸溶液！**出来吧！ ',
            '醋酸是我们日常中食醋的主要成分，它具有**弱酸性**，是应用最早、使用最多的酸味剂，主要用于调味料、罐头、干酪、果冻等制作。'
          ]
        }
      ]
    },
    {
      id: '滴加酸溶液',
      talks: [
        '现在酸溶液已经选择好啦，这一次我先帮你把酸溶液滴入试管中吧。',
        '接下来请一定要注意观察下面的实验操作哦。'
      ]
    },
    {
      id: '滴加酸溶液提问',
      talks: [
        '好啦，现在酸溶液已经滴入完成了，不知道实验师看清了刚才的实验操作了吗？',
        '接下来我要开始提问了。',
        '聪明的实验师，你觉得刚才滴入溶液的操作是规范的吗？'
      ],
      choices: [
        { name: '我觉得非常规范', replies: ['很遗憾，没有回答正确哦。'] },
        { name: '我感觉有一处不对劲..', replies: ['bingo~！回答正确！'] },
        { name: '我想再看一遍', replies: ['好的，那我们再看一遍吧！'] }
      ]
    },
    {
      id: '滴管滴加解释',
      talks: [
        '在刚才滴入酸溶液的时候，我们将胶头滴管伸入了**试管的内部**，这一步的实验操作其实是**不规范**的。',
        '要注意，在滴液时如果将胶头滴管伸入管的内部，很容易使胶头滴管**碰到试管的内壁，导致胶头滴管被污染**。',
        '并且在下次使用被污染的胶头滴管时，会影响到其他的药品，造成交叉污染，这样不仅会导致实验结果受到干扰，严重的还会引发化学事故哦。',
        '所以在使用胶头滴管滴液时，一定要注将其**竖直悬空于试管之上，不能伸入或接触试管**哦。'
      ],
      choices: [
        {
          name: '原来是这样！',
          replies: [
            '看来实验师已经弄明白了刚才关于胶头滴管的说明了呀。',
            '不过，还是稍微有点不放心呢...',
            '对啦！正好我这里有一道小测试题，实验师..不如你试着去完成一下，让我见识下你的实力吧！'
          ]
        },
        {
          name: '还..没有听明白，能重复一遍吗?',
          replies: ['当然没有问题，因为是很重要的知识，接下来我会重新再讲一遍，实验师请注意听讲哟。']
        }
      ]
    },
    {
      id: '选择碱溶液',
      talks: [
        '既然酸溶液已经滴入完毕，接下来就该轮到**碱溶液**的选择了。',
        '同样的，这次也有两种碱溶液可以选择哦，分别是氢氧化钠溶液和小苏打溶液。',
        '实验师，你想使用哪一种碱溶液与刚才的发生反应呢？'
      ],
      choices: [
        {
          name: '氢氧化钠溶液',
          replies: [
            '出来吧！**氢氧化钠！**',
            '氢氧化钠是工业中常用的碱性药品，它呈**强碱性**，主要用于造纸、纤维素浆粕的生产和肥皂、合成洗涤剂。'
          ]
        },
        {
          name: '小苏打溶液',
          replies: [
            '出来吧！**小苏打！** ',
            '小苏打又称食用碱，它呈**弱碱性**，在日常生活中用于生产饼干、面包等，是汽水饮料中二氧化碳的发生剂。'
          ]
        }
      ]
    },
    {
      id: '滴加碱溶液',
      talks: [
        '好了实验师，现在试着利用胶头滴管，将刚才新增的碱溶液逐滴地滴入试管里面吧。',
        '注意观察试管底部的发生的现象哦。'
      ]
    },
    {
      id: '承上启下部分',
      talks: [
        '其实在进行酸碱中和反应的过程中，根据酸碱溶液的不同，会造成不同的实验反应现象，比如说生成沉淀物。',
        '当然啦~！在某些酸碱物质的中和反应中，也不会出现太明显的现象变化，这时候，我们判断中和反应是否发生就需要借助【酸碱指示剂】来帮忙确定啦。'
      ]
    },
    {
      id: '阶段二开场',
      talks: [
        '不过现在来看，我们的溶液已经进行过中和反应了，直接添加酸碱指示剂也不太合适呢。',
        '没办法...只好用这一招了！',
        '时间倒流！ ',
        '好啦，虽然废了不少功夫,现在我们已经回到之前刚滴入酸溶液的时候了，现在的试管里面只有刚刚选好的酸溶液哦。'
      ],
      choices: [
        {
          name: '天啊，你是怎么做到的..',
          replies: ['嘿嘿~厉害吧( ﾟ∀ﾟ)，不过这不是重点啦，接下来我们就要选择酸碱指示剂了。']
        },
        {
          name: '你也太强了吧！',
          replies: ['嘿嘿~夸的我都不好意思了( ﾟ∀ﾟ)  ，不过这不是重点啦，接下来我们就要选择酸碱指示剂了。']
        }
      ]
    },
    {
      id: '选择酸碱指示剂',
      talks: [
        '实验师，看到桌面上的酸碱指示剂了吗？',
        '紫色的那瓶是【石蕊试剂】，它在酸性溶液中呈**红色**，中性溶液中呈**紫色**，碱性溶液中呈**蓝色**。',
        '无色透明的那瓶是【酚酞试剂】，它的特点超级好记~，在碱性溶液下呈**红色**！',
        '接下来其中一个酸碱指示剂来进行下面的实验吧。'
      ]
    },
    {
      id: '滴入酸碱指示剂',
      talks: [
        '完美~！我看到你已经选择好“趁手”的`酸碱指示剂`咯。',
        '事不宜迟，咱们就准备开始滴入吧~！',
        '不过在滴入指示剂的过程中，千千万万要注意观察试管溶液颜色的变化哦。'
      ]
    },
    {
      id: '阶段二-选择碱溶液',
      talks: [
        '`酸碱指示剂`已经顺利投入了，接下来我们试着加入碱性溶液，看看会发生什么样的变化吧~！',
        '接下来就是到了做选择的时间了...'
      ],
      choices: [
        {
          name: '氢氧化钠溶液',
          replies: [
            '嘿~看我的！',
            '氢氧化钠溶液已经召唤出来咯。',
            '氢氧化钠是工业中常用的碱性药品，它呈**强碱性**，主要用于造纸、纤维素浆粕的生产和肥皂、合成洗涤剂。'
          ]
        },
        {
          name: '小苏打溶液',
          replies: [
            '嘿~看我的！',
            '小苏打溶液已经召唤出来咯。',
            '小苏打又称食用碱，它呈**弱碱性**，在日常生活中用于生产饼干、面包等，是汽水饮料中二氧化碳的发生剂。'
          ]
        }
      ]
    },
    {
      id: '阶段二-滴加碱溶液',
      talks: [
        '现在试着逐滴地试着向试管中滴入`碱溶液`吧。',
        '千万注意在滴加的时候也别忘了要观察溶液的变化呢。'
      ]
    },
    {
      id: '阶段二-观察反应现象',
      talks: ['干的漂亮~，实验师，这一轮的中和反应已经完成啦！', '现在试着观察出现的实验现象，做个小总结吧。']
    },
    {
      id: '阶段二-提交实验结论后',
      talks: [
        '非常棒，实验师(๑•̀ㅂ•́)و✧，我看到你已经提交了刚才的实验结论了。',
        '做到这一步真的非常了不起了哦，不知道实验师对于【酸碱中和反应】实验的流程已经熟悉了吗？',
        '这次我们使用的酸碱指示剂是`酸碱指示剂`，下面我们试试另一种酸碱指示剂吧！',
        '当然啦，实验师也可以在接下来试试其他的反应物组合喔。',
        '如果实验师已经准备好下一步实验的话，就可以和我说一声啦！'
      ],
      choices: [
        {
          name: '我准备好啦！',
          replies: ['好咧！接下来又到了时间回溯的时间啦，实验师坐稳咯！', '嘿~！！时·间·倒·流！']
        }
      ]
    },
    {
      id: '阶段三-选择酸溶液',
      talks: [
        '实验师快看！前面的试管里面的溶液都已经空了呢。',
        '看来这我们这次运气不错，回溯地很成功呢，回到了最初始的状态。',
        '那么接下来就继续我们的实验吧！老套路~先试着添加一种酸溶液。',
        '可以的话，试着去选择和刚才不同的酸溶液吧~。'
      ],
      choices: [
        {
          name: '稀盐酸',
          replies: ['稀盐酸！就决定是你了！', '稀盐酸已经召唤出来咯！和刚才一样将它滴入到试管内吧！']
        },
        {
          name: '醋酸溶液',
          replies: ['现在轮到你了！醋酸溶液！', '醋酸溶液已经召唤出来咯！和刚才一样将它滴入到试管内吧！']
        }
      ]
    },
    {
      id: '阶段三-选择酸碱指示剂',
      talks: [
        '确认无误，酸性溶液再再再次滴入完毕。',
        '接下来，轮到酸碱指示剂的选择了，我们刚才使用的是`酸碱指示剂`。',
        '再选择刚才用过的`酸碱指示剂`的话是不是太没劲了(Ｔ▽Ｔ)。',
        '这次我们就换另一种酸碱指示剂试试看吧！和刚才一样在滴入的过程中记得要注意观察溶液的颜色变化哦。'
      ]
    },
    {
      id: '阶段三-选择碱溶液',
      talks: [
        '完美完成任务，看得出来实验师对滴加溶液的方法越来越熟练了呢୧(๑•̀◡•́๑)૭。',
        '这次我们成功地使用了`酸碱指示剂`作为我们的酸碱指示剂。',
        '不知道实验师有没有发现这两种不同的酸碱指示剂在**酸性溶液下的区别**呢？别忘了记录下来哦。',
        '接下来的环节..相信实验师你也应该猜到了吧..',
        '没错！是时候该选择碱溶液啦，试着选择你想要滴加的碱溶液吧~！'
      ],
      choices: [
        {
          name: '氢氧化钠溶液',
          replies: [
            '出来吧！氢氧化钠！',
            '碱溶液也成功召唤出来咯，这次选择的碱溶液是氢氧化钠溶液呢。',
            '接下来就试着将它滴入到试管内吧！',
            '在滴入的时候，千万别忘了要观察溶液的变化哦！特别是**溶液颜色**的变化。'
          ]
        },
        {
          name: '小苏打溶液',
          replies: [
            '现身吧！小苏打溶液！',
            '碱溶液也成功召唤出来咯，这次选择的碱溶液是小苏打溶液呢。',
            '接下来就试着将它滴入到试管内吧！',
            '在滴入的时候，千万别忘了要观察溶液的变化哦！特别是**溶液颜色**的变化。'
          ]
        }
      ]
    },
    {
      id: '阶段三-观察反应现象',
      talks: [
        '这次的中和反应也顺利完成！',
        '这一次我们使用的是`酸碱指示剂`作为我们的酸碱指示剂。',
        '相信实验师已经观察到不同酸碱指示剂下的中和反应，都有哪些不一样的特征了呢。',
        '接下来我们试着来总结一下刚才出现的现象。'
      ]
    },
    {
      id: '阶段三-提交实验结论后',
      talks: [
        '结论确认提交√！干的非常出色实验师~！(๑•̀ㅂ•́)و✧',
        '相信经过这几次的酸碱中和实验，实验师已经对酸碱中和反应有一定了解了吧！',
        '不如..我们来稍微复盘一下刚才进行的实验吧？'
      ],
      choices: [
        { name: '正有此意！', replies: ['不愧是被选中的实验师，在实验的最后还是这么有精神~！'] },
        {
          name: '复盘..好麻烦呀',
          replies: [
            '温故而知新！虽然做了这么多的实验，但是总结可是很有必要的哦~。',
            '最后的最后我就稍微多唠叨几句啦o(￣︶￣)o'
          ]
        }
      ]
    },
    {
      id: '实验复盘1',
      talks: [
        '酸碱中和反应其实就是酸与碱互相抵消，让酸碱度**回归中性**的反应。',
        '在酸碱中和反应中，其实最重要的就是要观察溶液的酸碱度即**pH值的变化**。',
        '可是pH值是没有办法直接观察到的，该怎么办呢？'
      ],
      choices: [
        { name: '使用酸碱指示剂！', replies: ['Bingo！酸碱指示剂是我们判断酸碱度的好帮手~！'] },
        {
          name: '用心去感受！',
          replies: [
            '虽然听起来很帅！但不对劲啦~！这时候要记住使用**酸碱指示剂**了哦！',
            '酸碱指示剂是我们判断酸碱度的好帮手。'
          ]
        }
      ]
    },
    {
      id: '实验复盘2',
      talks: [
        '在滴加酸碱指示剂后，就可以根据溶液的颜色去判断它的酸碱度了！',
        '在刚才的实验中，如果滴加了石蕊试剂就可以看到颜色**从红变紫再到蓝**。',
        '如果滴加了酚酞试剂则从**无色到红色**。',
        '代表着原来的酸溶液随着碱溶液的滴入逐渐变为**中性**。',
        '但随着酸溶液被**完全反应**后，碱溶液还再不断滴入，最后溶液又变为了**碱性**。',
        '这就是刚才实验现象的解释了~，实验师都弄明白了嘛？'
      ],
      choices: [
        { name: '原来如此！我懂了。', replies: ['太棒了！(๑•̀ㅂ•́)و✧，真不愧是最最最最最优秀的实验师！'] },
        { name: '可以再说一遍嘛？', replies: ['当然没有问题！接下来我就再复盘一遍哦~。'] }
      ]
    },
    {
      id: '结束语1',
      talks: ['总之恭喜你！实验师，这次的任务圆满完成！', '啪叽啪叽啪叽（拍手）'],
      choices: [
        { name: '总感觉很敷衍的庆祝呢...', replies: ['Σ(⊙▽⊙！明明是发自真心地祝贺...'] },
        { name: '嘿嘿~谢谢你！', replies: ['嘿嘿，都是实验师你自己努力的功劳啦！'] }
      ]
    },
    {
      id: '结束语2',
      talks: [
        '不管怎么样..接下来就到了说道别的时候咯。',
        '接下来的时间，就交给实验师自己去自由探索啦。',
        '去尝试其他的反应物的组合吧，看看会不会有新的发现呢？',
        '期待与你的下次冒险哦！实验师，下次再见啦ヾ(0▽0)'
      ],
      choices: [{ name: '下次再见！' }]
    }
  ]
}
