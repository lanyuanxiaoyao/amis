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
  controlBar?: boolean;
  /**
   * 数据
   */
  source?: string | object;
  /**
   * 自定义组件
   */
  components?: CustomFlowComponentSchema;
  /**
   * 新增面板
   */
  addBar?: boolean;
  /**
   * 新增面板样式
   */
  addBarMode?: 'select' | 'drag';
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
      components
    } = this.props;
    return (
      <>
        <Flow
          classnames={cx}
          className={className}
          onChange={onChange}
          nodeTypesDefine={components?.nodes ?? {}}
          render={render}
          source={this.props.source}
          miniMap={this.props.miniMap ?? false}
          controlBar={this.props.controlBar ?? false}
          addBar={this.props.addBar ?? false}
          addBarMode={this.props.addBarMode ?? 'select'}
        />
      </>
    );
  }
}
