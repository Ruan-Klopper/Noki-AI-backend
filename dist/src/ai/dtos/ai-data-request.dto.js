"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIDataRequestDto = exports.DataType = exports.TimePeriod = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var TimePeriod;
(function (TimePeriod) {
    TimePeriod["TODAY"] = "today";
    TimePeriod["THIS_WEEK"] = "this_week";
    TimePeriod["THIS_MONTH"] = "this_month";
    TimePeriod["NEXT_TWO_MONTHS"] = "next_two_months";
    TimePeriod["OVERDUE"] = "overdue";
    TimePeriod["ALL"] = "all";
})(TimePeriod || (exports.TimePeriod = TimePeriod = {}));
var DataType;
(function (DataType) {
    DataType["PROJECTS"] = "projects";
    DataType["TASKS"] = "tasks";
    DataType["TODOS"] = "todos";
})(DataType || (exports.DataType = DataType = {}));
class AIDataRequestDto {
    data_types;
    time_period;
    project_ids;
    include_completed;
}
exports.AIDataRequestDto = AIDataRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Types of data requested",
        enum: DataType,
        isArray: true,
        example: [DataType.PROJECTS, DataType.TASKS],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(DataType, { each: true }),
    __metadata("design:type", Array)
], AIDataRequestDto.prototype, "data_types", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Time period filter for tasks/todos",
        enum: TimePeriod,
        required: false,
        example: TimePeriod.THIS_WEEK,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(TimePeriod),
    __metadata("design:type", String)
], AIDataRequestDto.prototype, "time_period", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Optional project IDs to filter by",
        type: [String],
        required: false,
        example: ["project-123", "project-456"],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], AIDataRequestDto.prototype, "project_ids", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Include completed items",
        required: false,
        default: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], AIDataRequestDto.prototype, "include_completed", void 0);
//# sourceMappingURL=ai-data-request.dto.js.map