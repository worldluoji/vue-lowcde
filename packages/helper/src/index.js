
import atomicManager from './AtomicManager/AtomicManager';
import dragManager from './dragmanager/dragmanager';
import UUID from './UUID/uuid';
import Request from './plugins/request';
import render from './Render/Render.vue';
import JavaScriptEditor from './editor/JavaScriptEditor.vue'

export const AtomicManager = atomicManager;
export const DragManager = dragManager;
export const uuid = UUID;
export const request = Request;
export const Render = render;
export const JSEditor = JavaScriptEditor;