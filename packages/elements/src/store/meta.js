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
function removeDeps(depMap, eid, removeFirst = true, deps = 0) {
  let { value } = depMap.get(eid);
  if (!value) {
    return;
  }
  // 当前节点从依赖树移除
  if (removeFirst) {
    depMap.delete(eid);
  }
  
  // 递归将所有儿子从依赖树移除
  if (value.props) {
    if (value.props.children) {
      for (let child of value.props.children) {
        removeDeps(child.id, deps + 1);
      }
    }
    // 这里可能是Blank包了一层
    if (value.props.props) {
      if (value.props.props.id) {
        depMap.delete(value.props.props.id);
      }
      for (let child of value.props.props.children) {
        removeDeps(child.id, deps + 1);
      }
    }
  }
}

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
    setDepMap(d) {
      this.depMap = d
    },
    updateProps(currentId, value) {
      let it = this.depMap.get(currentId).value
      // console.log('update', currentId, value, this.depMap)
      if (it) {
        Object.assign(it.props, value)
      }
    },
    removeChildren(eid, children) {
      let e = this.depMap.get(eid).value
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
      let e = this.depMap.get(eid).value;
      if (e) {
        if (!e.props.children) {
          e.props.children = [];
        }
        for (let child of children) {
          e.props.children.push(child);
          // 设置依赖关系，方便查找
          this.depMap.set(child.id, {value: child, parent: eid});
          
          // 容器的情况，里面是blank, 要一起加入，否则会出现问题
          if (child.props.id) {
            this.depMap.set(child.props.id, {value: child.props, parent: child.id});
          }
        }
      }
    },
    delete(eid) {
      let {value, parent} = this.depMap.get(eid);
      if (!value) {
        return;
      }

      let removeFirst = true

      // 清空当前节点
      if (parent) {
        let ele = this.depMap.get(parent)?.value;
        if (!ele || !ele.props) {
          return;
        }
        if (ele.props.children) {
          ele.props.children = ele.props.children.filter(c => c.id !== eid)
          // this.removeChildren(parent, new Set().add(eid));
        }
        // 父节点是Blank容器，置空即可
        if (ele.props.element) {
          ele.props.element = '';
          ele.props.props = {};
          removeFirst = false;
        }
      } else {
        this.content = this.content.filter(c => c.id !== eid);
        // this.depMap.delete(eid);
      }
      
      // 依赖清除
      removeDeps(this.depMap, eid, removeFirst);
      console.log(this.depMap);
      
    }
  }
});

export default metaStore;