const dfsDepMap = (content, depMap, parent = null) => {
  for (let e of content) {
    depMap.set(e.id, { value: e, parent: parent });

    // 对象容纳了一个组件,比如Blank
    if (e.props.id) {
      depMap.set(e.props.id, { value: e.props, parent: e.id });
      if (e.props.props && e.props.props.children) {
        dfsDepMap(e.props.props.children, depMap, e.props.id);
      }
    }

    // 对象有children, 比如List容器
    if (e.props.children && e.props.children.length > 0) {
      dfsDepMap(e.props.children, depMap, e.id);
    }
  }
};

function removeDeps(depMap, eid, removeFirst = true, deps = 0) {
  let { value } = depMap.get(eid);
  // console.log(deps, removeFirst, eid, value);
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
        removeDeps(depMap, child.id, true, deps + 1);
      }
    }
    // 这里可能是Blank包了一层
    if (value.props.id) {
      depMap.delete(value.props.id);
      if (value.props.props && value.props.props.children) {
        for (let child of value.props.props.children) {
          removeDeps(depMap, child.id, true, deps + 1);
        }
      }
    }
  }
}

const metaStore = Pinia.defineStore('meta', {
  state: () => {
    return {
      content: [],
      depMap: new Map(),
      id: 0,
      appPageId: ''
    };
  },
  getters: {
    get(state) {
      return state.content;
    },
    getElementById(state) {
      return (id) => state.depMap.get(id);
    },
    getDepMap(state) {
      return state.depMap;
    },
    getId(state) {
      return state.id;
    },
    getAppPageId(state) {
      return state.appPageId;
    }
  },
  actions: {
    set(c, force = false) {
      this.content = c;
      if (force || (c && c.length > 0 && this.depMap.size === 0)) {
        this.depMap = new Map();
        dfsDepMap(this.content, this.depMap);
      }
    },
    setDepMap(d) {
      this.depMap = d;
    },
    setId(id) {
      this.id = id;
    },
    setAppPageId(id) {
      this.appPageId = id;
    },
    updateProps(currentId, value) {
      let it = this.depMap.get(currentId).value;
      if (it) {
        Object.assign(it.props, value);
      }
    },
    removeChildren(eid, children) {
      let e = this.depMap.get(eid).value;
      if (e) {
        let newChildren = [];
        for (let child of e.props.children) {
          if (!children.has(child.id)) {
            newChildren.push(child);
          } else {
            // 如果是要删除的节点，就移除依赖
            this.depMap.delete(child.id);
          }
        }
        e.props.children = newChildren;
      }
    },
    addChildren(eid, children) {
      let e = (this.depMap.get(eid) || {}).value;
      if (e) {
        if (!e.props.children) {
          e.props.children = [];
        }
        for (let child of children) {
          e.props.children.push(child);
          // 设置依赖关系，方便查找
          this.depMap.set(child.id, { value: child, parent: eid });

          // 容器的情况，里面是blank, 要一起加入，否则会出现问题
          if (child.props.id) {
            this.depMap.set(child.props.id, {
              value: child.props,
              parent: child.id
            });
          }
        }
      }
    },
    setChildren(eid, children) {
      let e = (this.depMap.get(eid) || {}).value;
      if (e) {
        e.props.children = children;
        for (let child of children) {
          // 设置依赖关系，方便查找
          this.depMap.set(child.id, { value: child, parent: eid });

          // 容器的情况，里面是blank, 要一起加入，否则会出现问题
          if (child.props.id) {
            this.depMap.set(child.props.id, {
              value: child.props,
              parent: child.id
            });
          }
        }
      }
    },
    delete(eid) {
      let { value, parent } = this.depMap.get(eid);
      if (!value) {
        return;
      }

      let removeFirst = true;

      // 清空当前节点
      if (parent) {
        let ele = this.depMap.get(parent)?.value;
        if (!ele || !ele.props) {
          return;
        }
        if (ele.props.children) {
          ele.props.children = ele.props.children.filter((c) => c.id !== eid);
          // this.removeChildren(parent, new Set().add(eid));
        }
        // 父节点是Blank容器，置空即可
        if (ele.props.element) {
          ele.props.element = '';
          ele.props.props = {};
          removeFirst = false;
        }
      } else {
        this.content = this.content.filter((c) => c.id !== eid);
        // this.depMap.delete(eid);
      }

      // 依赖清除
      removeDeps(this.depMap, eid, removeFirst);
    }
  }
});

export default metaStore;
