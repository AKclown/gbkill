import { useState, useCallback, useEffect } from 'react';
import { useInput, Key } from 'ink';
import eventBus, { EVENT_TYPE } from '../../eventBus.js';

export interface IRange {
  start: number;
  end: number;
}

export interface IEventTrigger {
  onSpace: (range: IRange) => void;
  onTab: (range: IRange) => void;
}

const userInput = (maxLen: number, eventTrigger: IEventTrigger) => {
  // 批量选择的 - 基准下标
  const [benchmark, setBenchmark] = useState(0);
  const [isBatch, setIsBatch] = useState(false);
  // 当前活动下标
  const [activeIndex, setActiveIndex] = useState(0);
  const [range, setRange] = useState<IRange>({ start: 0, end: 0 });

  useEffect(() => {
    const distance = range.end - range.start;
    eventBus.emit(EVENT_TYPE.AMOUNT, distance + 1);
  }, [range, eventBus]);

  const updateRangeByIndex = (index: number) => {
    if (isBatch) {
      // 判断在基线的上还是下还是相等
      if (index > benchmark) {
        // start保持不变
        setRange({ start: range.start, end: index });
      } else if (index < benchmark) {
        // end保持不变
        setRange({ start: index, end: range.end });
      } else {
        setRange({ start: index, end: index });
      }
    } else {
      setRange({ start: index, end: index });
    }
  };

  const eventlistener = useCallback(
    (input: string, key: Key) => {
      if (key.upArrow && activeIndex > 0) {
        // 向上选择
        const index = activeIndex - 1;
        updateRangeByIndex(index);
        setActiveIndex(index);
      } else if (key.downArrow && activeIndex < maxLen - 1) {
        // 向下选择
        const index = activeIndex + 1;
        updateRangeByIndex(index);
        setActiveIndex(index);
      } else if (key.rightArrow) {
        // 区间选择开关
        if (!isBatch) {
          // 设置批量选择的参照点
          setBenchmark(range.start);
        } else {
          setRange({ start: activeIndex, end: activeIndex });
        }
        setIsBatch(!isBatch);
      } else if (input === ' ') {
        // 删除已merged分支
        eventTrigger.onSpace(range);
      } else if (key.tab) {
        // 删除未merge分支
        eventTrigger.onTab(range);
      }

      // TODO 条件有待商榷
    },
    [range, isBatch, benchmark, activeIndex]
  );

  useInput(eventlistener);
  return { range, activeIndex };
};

export default userInput;
