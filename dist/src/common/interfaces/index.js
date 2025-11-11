"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceType = exports.Priority = exports.TaskType = exports.ProjectSource = exports.AuthProviderType = void 0;
__exportStar(require("./api-response.interface"), exports);
var AuthProviderType;
(function (AuthProviderType) {
    AuthProviderType["Canvas"] = "Canvas";
    AuthProviderType["Google"] = "Google";
    AuthProviderType["Microsoft"] = "Microsoft";
})(AuthProviderType || (exports.AuthProviderType = AuthProviderType = {}));
var ProjectSource;
(function (ProjectSource) {
    ProjectSource["Personal"] = "Personal";
    ProjectSource["Canvas"] = "Canvas";
})(ProjectSource || (exports.ProjectSource = ProjectSource = {}));
var TaskType;
(function (TaskType) {
    TaskType["Canvas"] = "Canvas";
    TaskType["Project"] = "Project";
    TaskType["Personal"] = "Personal";
})(TaskType || (exports.TaskType = TaskType = {}));
var Priority;
(function (Priority) {
    Priority["High"] = "High";
    Priority["Medium"] = "Medium";
    Priority["Low"] = "Low";
})(Priority || (exports.Priority = Priority = {}));
var ResourceType;
(function (ResourceType) {
    ResourceType["Document"] = "Document";
    ResourceType["Link"] = "Link";
    ResourceType["Note"] = "Note";
    ResourceType["Media"] = "Media";
    ResourceType["AI_Generated"] = "AI_Generated";
})(ResourceType || (exports.ResourceType = ResourceType = {}));
//# sourceMappingURL=index.js.map