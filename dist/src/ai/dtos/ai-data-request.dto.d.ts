export declare enum TimePeriod {
    TODAY = "today",
    THIS_WEEK = "this_week",
    THIS_MONTH = "this_month",
    NEXT_TWO_MONTHS = "next_two_months",
    OVERDUE = "overdue",
    ALL = "all"
}
export declare enum DataType {
    PROJECTS = "projects",
    TASKS = "tasks",
    TODOS = "todos"
}
export declare class AIDataRequestDto {
    data_types: DataType[];
    time_period?: TimePeriod;
    project_ids?: string[];
    include_completed?: boolean;
}
