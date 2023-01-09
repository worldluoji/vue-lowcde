<template>
  <Render :content="content" />
</template>

<script setup>
import { Render } from '@lowcode/helper';
const content = [
  {
    id: '4b26f166-83bb-4a33-a52e-c9a8603f8e5f',
    name: 'NavBar',
    type: 'Basic',
    props: { title: '商品列表' },
    state: 1
  },
  {
    id: 'be428e9a-bb8c-42b2-a221-b61ffcff5b7b',
    name: 'OfferList',
    type: 'Basic',
    props: { condition: 'PadList' },
    state: 1
  },
  {
    id: 'a42b3d4a-4611-4bfe-af9b-ee23480b02b1',
    name: 'ColumnList',
    type: 'Container',
    props: {
      children: [
        {
          id: '05ed63cd-b0c3-4481-ba2a-7475d5628448',
          name: 'Blank',
          props: {
            id: 'b7067c53-31ba-4a04-8182-204271162758',
            element: 'Image',
            props: {}
          }
        },
        {
          id: '87f8cb1a-7d9d-4a83-a9f5-12dc717ac85d',
          name: 'Blank',
          props: {
            id: '5b6a1835-e2ef-49ed-99d8-c6c35ec2cc23',
            element: 'Image',
            props: {}
          }
        }
      ],
      column: 2,
      gap: 10,
      atomicAttrs: {
        marginTop: '0',
        marginRight: '5',
        marginBottom: '0',
        marginLeft: '5'
      }
    },
    state: 1
  }
];
</script>
