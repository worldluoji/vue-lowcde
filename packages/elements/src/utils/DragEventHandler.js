const { map, switchMap, takeUntil, fromEvent } = rxjs;
// const fromEvent = RxJS.fromEvent;

/*
 * 返回的是鼠标位置的横坐标和纵坐标
 */
function getMouseEventPos(event) {
  // console.log('mouse move: ', event.clientX, event.clientY)
  // 组织默认行为，否则父组件会被跟着拖拽，出现“重影”
  event.preventDefault();
  return {
    x: event.clientX,
    y: event.clientY
  };
}

/*
 * 为组件增加相对父组件自由拖拽的能力
 */
export function addDragCapability(element, handleMouseUp) {
  if (element == null || element.parentElement == null) {
    throw new Error('can not find element element');
  }

  const mousedown$ = fromEvent(element, 'mousedown').pipe(
    map(getMouseEventPos)
  );

  // move时返回鼠标的位置
  const mousemove$ = fromEvent(element.parentElement, 'mousemove').pipe(
    map(getMouseEventPos)
  );

  const mouseup$ = fromEvent(element.parentElement, 'mouseup');

  const drag$ = mousedown$.pipe(
    switchMap((initialPos) => {
      // 相对父容器的偏移量
      const top = element.offsetTop;
      const left = element.offsetLeft;
      // const { top, left } = element.getBoundingClientRect() 不再使用可视宽度
      // console.log('enter in switch map', top, left, initialPos);
      // console.log(0, element.parentElement?.clientWidth)
      const parentWidth = element.parentElement?.clientWidth;
      const parentHeight = element.parentElement?.clientHeight;
      const currentWidth = element.clientWidth;
      const currentHeight = element.clientHeight;
      let lastTop = null;
      let lastLeft = null;
      const res = mousemove$.pipe(
        // 根据mousemove$的定义，这里x,y是实时的鼠标位置，减去初始位置，再加上偏移量，就是相对父容器的位置
        map(({ x, y }) => {
          const newTop = y - initialPos.y + top;
          const newLeft = x - initialPos.x + left;
          // 不允许超出父容器
          if (
            (parentHeight && newTop + currentHeight > parentHeight) ||
            (parentWidth && newLeft + currentWidth > parentWidth) ||
            newTop < 0 ||
            newLeft < 0
          ) {
            return {
              top: lastTop ? lastTop : top,
              left: lastLeft ? lastLeft : left
            };
          }

          // 到这里，说明拖拽在父容器内，是一个合理值，记录下来，以便不合理时回退
          lastTop = newTop;
          lastLeft = newLeft;
          return {
            top: newTop,
            left: newLeft
          };
        }),

        // 直到鼠标释放停止流
        takeUntil(mouseup$)
      );

      // res.forEach(r => {
      //   // 计算之后的top和left
      //   console.log(r.top, r.left)
      // })
      return res;
    })
  );

  drag$.subscribe(({ top, left }) => {
    element.style.top = `${top}px`;
    element.style.left = `${left}px`;
    element.style.bottom = '';
    element.style.right = '';
    if (handleMouseUp) {
      const elementId = element.dataset.child;
      if (elementId) {
        handleMouseUp(top, left, elementId);
      }
    }
  });
}
