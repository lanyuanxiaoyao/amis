/**
 * @file Flow.tsx 流程图组件
 *
 * @author lanyuanxiaoyao
 * @created: 2025/03/11
 */

import React from 'react';
import {
  IScopedContext,
  FormItem,
  FormControlProps,
  ScopedContext,
  Renderer,
  RendererProps,
  FormSchemaBase
} from 'amis-core';
import {Flow} from 'amis-ui';
import pick from 'lodash/pick';
import {
  BaseSchema,
  FormBaseControlSchema,
  SchemaApi,
  SchemaObject
} from '../../Schema';
import Service from '../Service';
import {keys} from 'lodash';
import {FormControlSchema} from './Control';

export interface CustomNodeComponentSchema {
  /**
   * 节点名称
   */
  title?: string;
  /**
   * 节点内容
   */
  body: SchemaObject;
}

export interface CustomFlowComponentSchema {
  nodes: Record<string, CustomNodeComponentSchema>;
}

export interface FlowSchema extends FormBaseControlSchema {
  type: 'flow';
  /**
   * mini Map
   */
  miniMap?: boolean;
  /**
   * Controls
   */
  controls?: boolean;
  /**
   * 数据
   */
  source?: string | object;
  /**
   * 自定义组件
   */
  components?: CustomFlowComponentSchema;
}

export interface IFlowProps extends FormControlProps {}

@FormItem({
  type: 'flow'
})
export default class FlowComponent extends React.Component<IFlowProps> {
  render() {
    const {
      classnames: cx,
      className,
      onChange,
      render,
      components,
      data
    } = this.props;
    const props = pick(this.props, ['source', 'miniMap', 'controls']);
    const nodeTypes: Record<string, CustomNodeComponentSchema> =
      components?.nodes ?? {};

    const nodeRender = (
      id: string,
      type: string,
      nodeData: Record<string, any>,
      onNodeFormChange: (id: string, value: any) => void
    ): JSX.Element => {
      let typeDefine = nodeTypes[type];
      return (
        <>
          <div className="body-container">
            {typeDefine?.title && (
              <div className="body-title">{typeDefine.title}</div>
            )}
            <div className="nodrag nopan">
              {typeDefine.body.type === 'form'
                ? render(`${type}-${id}`, typeDefine.body, {
                    data: {...nodeData},
                    onChange: (value: any) => onNodeFormChange(id, value)
                  })
                : render(`${type}-${id}`, typeDefine.body, {
                    data: {...nodeData}
                  })}
            </div>
          </div>
        </>
      );
    };
    return (
      <>
        <Flow
          classnames={cx}
          className={className}
          onChange={onChange}
          nodeTypes={keys(nodeTypes)}
          nodeRender={nodeRender}
          {...props}
        />
      </>
    );
  }
}
