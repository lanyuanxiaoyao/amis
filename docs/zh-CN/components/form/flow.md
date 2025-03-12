---
title: flow 流程图
description:
type: 0
group: null
menuName: flow
icon:
order: 100
---

## 基本用法

```schema: scope="body"
{
    "debug": true,
    "type": "form",
    "body": [
        {
            "name": "flow-data",
            "label": "流程图",
            "type": "flow",
            "source": {
                "nodes": [
                    {
                        "id": "2",
                        "position": {
                            "x": 100,
                            "y": 100
                        },
                        "type": "form-node"
                    },
                    {
                        "id": "5",
                        "position": {
                            "x": 300,
                            "y": 100
                        },
                        "data": {
                            "name": "Tony"
                        },
                        "type": "form-node"
                    },
                ],
                "edges": []
            },
            "components": {
                "nodes": {
                    "form-node": {
                        "body": {
                            "title": "表单节点",
                            "type": "form",
                            "actions": [],
                            "body": [
                                {
                                    "type": "input-text",
                                    "name": "name",
                                    "label": "姓名："
                                },
                                {
                                    "name": "email",
                                    "type": "input-email",
                                    "label": "邮箱："
                                }
                            ]
                        }
                    }
                }
            }
        }
    ]
}
```

## 简单节点

React Flow 提供的默认样式，`type`为`input`为只有输出没有输入的节点，通常为流程开始节点，`type`为`output`为只有输入没有输出的节点，通常为流程结束节点，通过在`data`的`label`变量来定义节点显示的名称。

```schema: scope="body"
{
    "debug": true,
    "type": "form",
    "body": [
        {
            "name": "flow-data",
            "label": "流程图",
            "type": "flow",
            "source": {
                "nodes": [
                    {
                        "id": "1",
                        "position": {
                            "x": 0,
                            "y": 0
                        },
                        "data": {
                            "label": "开始节点"
                        },
                        "type": "input"
                    },
                    {
                        "id": "2",
                        "position": {
                            "x": 0,
                            "y": 100
                        },
                        "data": {
                            "label": "普通节点"
                        }
                    },
                    {
                        "id": "3",
                        "position": {
                            "x": 0,
                            "y": 200
                        },
                        "data": {
                            "label": "结束节点"
                        },
                        "type": "output"
                    },
                ]
            },
        }
    ]
}
```

## 属性表

| 属性名            | 类型      | 默认值     | 说明                 |
| ----------------- | --------- | ---------- | -------------------- |
| width             | `number`  |            | 组件宽度，最小 300   |
| height            | `number`  |            | 组件高度，最小 160   |
| color             | `string`  | `#000`     | 手写字体颜色         |
| bgColor           | `string`  | `#EFEFEF`  | 面板背景颜色         |
| clearBtnLabel     | `string`  | `清空`     | 清空按钮名称         |
| undoBtnLabel      | `string`  | `撤销`     | 撤销按钮名称         |
| confirmBtnLabel   | `string`  | `确认`     | 确认按钮名称         |
| embed             | `boolean` |            | 是否内嵌             |
| embedConfirmLabel | `string`  | `确认`     | 内嵌容器确认按钮名称 |
| ebmedCancelLabel  | `string`  | `取消`     | 内嵌容器取消按钮名称 |
| embedBtnIcon      | `string`  |            | 内嵌按钮图标         |
| embedBtnLabel     | `string`  | `点击签名` | 内嵌按钮文案         |
