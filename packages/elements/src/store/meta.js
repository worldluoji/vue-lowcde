import { defineStore } from 'pinia';

// // 递归逐层查找，后续优化
// const findById = (content, id) => {
//   for (let e of content) {
//     if (e.id === id) {
//       return e
//     } else {
//       // 对象容纳了一个组件,比如Blank
//       if (e.props.id && e.props.id === id) {
//         return e.props
//       }

//       // 对象有children, 比如List容器
//       if (e.props.children && e.props.children.length > 0) {
//         let t = findById(e.props.children, id)
//         if (t) {
//           return t
//         }
//       }

//       if (e.props.props && e.props.props.children) {
//         let t = findById(e.props.props.children, id)
//         if (t) {
//           return t
//         }
//       }
//     }
//   }
//   return null
// }

const metaStore = defineStore("meta", {
  state: () => {
    return {
      content: [],
      depMap: new Map()
    }
  },
  getters: {
    get(state) {
      return state.content;
    },
    getElementById(state) {
      return (id) => state.depMap.get(id);
    },
    getDepMap(state) {
      return state.depMap
    }
  },
  actions: {
    set(c) {
      this.content = c
    },
    updateProps(currentId, value) {
      let it = this.depMap.get(currentId)
      console.log('update', currentId, value)
      if (it) {
        Object.assign(it.props, value)
      }
    },
    removeChildren(eid, children) {
      let e = this.depMap.get(eid)
      if (e) {
        let newChildren = []
        for (let child of e.props.children) {
          if (!children.has(child.id)) {
            newChildren.push(child)
          } else {
            // 如果是要删除的节点，就移除依赖
            this.depMap.delete(child.id)
          }
        }
        e.props.children = newChildren
      }
    },
    addChildren(eid, children) {
      let e = this.depMap.get(eid);
      if (e) {
        if (!e.props.children) {
          e.props.children = [];
        }
        for (let child of children) {
          e.props.children.push(child);
          // 设置依赖关系，方便查找
          this.depMap.set(child.id, child);
          
          // 容器的情况，里面是blank, 要一起加入，否则会出现问题
          if (child.props.id) {
            this.depMap.set(child.props.id, child.props);
          }
        }
      }
    }
  }
});

export default metaStore;