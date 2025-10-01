// Shared interfaces for all models
export enum AuthProviderType {
  Canvas = 'Canvas',
  Google = 'Google',
  Microsoft = 'Microsoft',
}

export enum CourseSource {
  Canvas = 'Canvas',
  GoogleClassroom = 'GoogleClassroom',
}

export enum TaskType {
  Canvas = 'Canvas',
  Project = 'Project',
  Personal = 'Personal',
}

export enum Priority {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

export enum ResourceType {
  Document = 'Document',
  Link = 'Link',
  Note = 'Note',
  Media = 'Media',
  AI_Generated = 'AI_Generated',
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password_hash: string;
  profile_image?: string;
  google_id?: string;
  created_at: Date;
  updated_at: Date;

  // Relations
  auth_providers?: AuthProvider[];
  projects?: Project[];
  courses?: Course[];
  tasks?: Task[];
  todos?: Todo[];
  resources?: Resource[];
}

export interface AuthProvider {
  id: string;
  user_id: string;
  type: AuthProviderType;
  base_url?: string;
  access_token_hash: string;
  refresh_token_hash?: string;
  metadata?: any;
  created_at: Date;

  // Relations
  user?: User;
}

export interface Project {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  created_at: Date;
  updated_at: Date;

  // Relations
  user?: User;
  tasks?: Task[];
  resources?: Resource[];
}

export interface Course {
  id: string;
  user_id: string;
  source: CourseSource;
  external_id: string;
  title: string;
  course_code?: string;
  time_zone?: string;
  start_at?: Date;
  end_at?: Date;
  raw_data?: any;
  created_at: Date;
  updated_at: Date;

  // Relations
  user?: User;
  tasks?: Task[];
  resources?: Resource[];
}

export interface Task {
  id: string;
  user_id: string;
  project_id?: string;
  course_id?: string;
  title: string;
  description?: string;
  due_date?: Date;
  created_at: Date;
  updated_at: Date;
  type: TaskType;
  priority?: Priority;
  raw_canvas_data?: any;

  // Relations
  user?: User;
  project?: Project;
  course?: Course;
  todos?: Todo[];
  resources?: Resource[];
}

export interface Todo {
  id: string;
  user_id: string;
  task_id: string;
  title: string;
  description?: string;
  priority?: Priority;
  due_date?: Date;
  created_at: Date;
  updated_at: Date;

  // Relations
  user?: User;
  task?: Task;
}

export interface Resource {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  type: ResourceType;
  url?: string;
  file_path?: string;
  metadata?: any;
  created_at: Date;
  updated_at: Date;

  // Optional relations
  task_id?: string;
  course_id?: string;
  project_id?: string;

  // Relations
  user?: User;
  task?: Task;
  course?: Course;
  project?: Project;
}
