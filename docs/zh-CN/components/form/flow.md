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
            "controlBar": true,
            "source": {
                "nodes": [
                    {
                        "id": "1",
                        "position": {
                            "x": 0,
                            "y": 0
                        },
                        "data": {
                            "label": "开始"
                        },
                        "type": "input"
                    },
                    {
                        "id": "2",
                        "position": {
                            "x": 100,
                            "y": 100
                        },
                        "data": {
                            "llm": "deepseek-r1",
                            "topp": 0.5
                        },
                        "type": "form-node"
                    },
                    {
                        "id": "3",
                        "position": {
                            "x": 400,
                            "y": 560
                        },
                        "data": {
                            "label": "结束"
                        },
                        "type": "output"
                    },
                ],
                "edges": [
                    {
                        "id": "1-2",
                        "source": "1",
                        "target": "2",
                        "markerEnd": {
                            "type": "arrow"
                        },
                        "label": "Start"
                    },
                    {
                        "id": "2-3",
                        "source": "2",
                        "target": "3",
                        "markerEnd": {
                            "type": "arrowclosed"
                        },
                        "label": "End"
                    }
                ]
            },
            "components": {
                "nodes": {
                    "form-node": {
                        "body": {
                            "title": "大模型",
                            "type": "form",
                            "mode": "horizontal",
                            "horizontal": {
                                "leftFixed": "sm"
                            },
                            "actions": [],
                            "body": [
                                {
                                    "label": "模型",
                                    "type": "select",
                                    "name": "llm",
                                    "options": [
                                        {
                                            "label": "Deepseek R1",
                                            "value": "deepseek-r1"
                                        },
                                        {
                                            "label": "Deepseek V3",
                                            "value": "deepseek-v3"
                                        }
                                    ]
                                },
                                {
                                    "type": "textarea",
                                    "name": "system",
                                    "label": "系统提示词"
                                },
                                {
                                    "type": "textarea",
                                    "name": "user",
                                    "label": "用户提示词"
                                },
                                {
                                    "type": "input-range",
                                    "label": "Top P",
                                    "name": "topp",
                                    "min": 0,
                                    "max": 1,
                                    "step": 0.01,
                                    "showInput": true
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
                            "x": 100,
                            "y": 100
                        },
                        "data": {
                            "label": "普通节点"
                        }
                    },
                    {
                        "id": "3",
                        "position": {
                            "x": 200,
                            "y": 200
                        },
                        "data": {
                            "label": "结束节点"
                        },
                        "type": "output"
                    },
                ],
                "edges": [
                    {
                        "id": "1-2",
                        "source": "1",
                        "target": "2"
                    },
                    {
                        "id": "2-3",
                        "source": "2",
                        "target": "3"
                    }
                ]
            },
        }
    ]
}
```

## 自定义节点

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
