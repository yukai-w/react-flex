import Box from '@/components/box/box';
import CodeView from '@/components/CodeView/code';
import { useDva } from '../hooks/useDva';
import { useEffect } from 'react';
import EditTree from '@/components/EditableTree/EditableTree';
import { renderCss, renderJSX} from '../utils/utils';

// 测试data
const testData = [
  {
    flex: 1,
    flexDirection: 'column',
    children: [
      {
        flex: 1,
        flexDirection: 'row',
        children: [
          {
            flex: 2,
          },
          {
            flex: 3,
          },
        ],
      },
      {
        flex: 1,
      },
    ],
  },
];
// 初始init
const initData = [
  {
    flex: 1,
    flexDirection: 'column',
    children: [
      {
        flex: 1,
      },
      {
        flex: 1,
      }
    ],
  },
];

/**
 * @description 渲染data
 * @param {*} data 
 * @param {*} index 
 */
const renderData = (data, index) => {
  return data.map((item, i) => {
    const { flex = '', flexDirection = '', children = [] } = item;
    const indexs = index === '' ? String(i) : `${index}-${i}`;
    const parentStyle = {
      flex,
      flexDirection,
      display: 'flex',
      height: '100%',
    };
    const childrenStyle = {
      flex,
      flexDirection,
    };
    if (children.length > 0) {
      return (
        <div style={parentStyle} data-id={indexs} key={indexs}>
          {children ? renderData(children, indexs) : null}
        </div>
      );
    }
    return (
      <div style={childrenStyle} data-id={indexs} key={indexs}>
        <Box index={indexs} info={item} />
      </div>
    );
  });
};

const index = () => {
  const {
    dispatch,
    data: {
      settings: { currentView },
    },
  } = useDva({}, ['settings']);

  useEffect(() => {
    dispatch({
      type: 'settings/changeView',
      payload: testData,
    });
    return () => {};
  }, []);

  const addInitData = () => {
    dispatch({
      type: 'settings/changeView',
      payload: initData,
    });
  };

  const empty = () => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
        onClick={() => addInitData()}
      >
        empty
      </div>
    );
  };

  return (
    <>
      <div style={{display: 'flex'}}>
        <div style={{ border: '1px solid red', height: '300px', width: '600px' }}>
          {currentView.length > 0 ? renderData(currentView, '') : empty()}
        </div>
        <div>
          classNameTree
          <EditTree />
        </div>
      </div>
      <div style={{display: 'flex'}}>
        <CodeView code={renderJSX(currentView)} />
        <CodeView code={renderCss(currentView)} />
      </div>
    </>
  );
};

export default index;
