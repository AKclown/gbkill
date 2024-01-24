import { Box, measureElement, useInput, Key } from "ink";
import React, { useRef, useReducer, useEffect } from "react";

// https://github.com/vadimdemedes/ink/issues/432

enum TRIGGER_TYPE {
	SET_INNER_HEIGHT = 'setInnerHeight',
	SCROLL_DOWN = 'scrollDown',
	SCROLL_UP = 'scrollUp',
}

interface IAction {
	innerHeight?: number;
	type: TRIGGER_TYPE
}

const reducer = (state: any, action: IAction) => {
	switch (action.type) {
		case TRIGGER_TYPE.SET_INNER_HEIGHT:
			return {
				...state,
				innerHeight: action.innerHeight
			};

		case TRIGGER_TYPE.SCROLL_DOWN:
			return {
				...state,
				scrollTop: Math.min(
					state.innerHeight - state.height,
					state.scrollTop + 1
				)
			};

		case TRIGGER_TYPE.SCROLL_UP:
			return {
				...state,
				scrollTop: Math.max(0, state.scrollTop - 1)
			};

		default:
			return state;
	}
};

function ScrollArea({ height, children, lockScrollDown }: any) {
	const [state, dispatch] = useReducer(reducer, {
		height,
		scrollTop: 0
	});

	const innerRef = useRef(null);

	useEffect(() => {
		const dimensions = measureElement(innerRef.current!);

		dispatch({
			type: TRIGGER_TYPE.SET_INNER_HEIGHT,
			innerHeight: dimensions.height
		});
	}, [height]);

	useInput((input: string, key: Key) => {
		if (key.downArrow) {
			// $ 如果当前界面已经足够显示所有内容，滚动条不在往下滚动
			if (lockScrollDown) return
			dispatch({
				type: TRIGGER_TYPE.SCROLL_DOWN
			});
		}

		if (key.upArrow) {
			dispatch({
				type: TRIGGER_TYPE.SCROLL_UP
			});
		}
	});

	return (
		<Box height={height} flexDirection="column" overflow="hidden">
			<Box
				ref={innerRef}
				flexShrink={0}
				flexDirection="column"
				marginTop={-state.scrollTop}
			>
				{children}
			</Box>
		</Box>
	);
}

export default ScrollArea


