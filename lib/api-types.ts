
import { type FileType } from "./types"

export type ID = string
export type DateString = string

export type Profile = {
  user_id: string
  name: string
  email: string
  phone?: string
  location?: string
  linkedin?: string
  github?: string
  website?: string
  skills: string[]
  experience: Experience[]
  education: Education[]
}

export type Experience = {
  title: string
  company: string
  location: string
  startDate: DateString
  endDate: DateString
  description: string
}

export type Education = {
  school: string
  degree: string
  location: string
  startDate: DateString
  endDate: DateString
  description: string
}

export type SalaryRange = {
  min: number
  max: number
  currency: string
}

export type JobPost = {
  id: ID
  title: string
  company: string
  location: string
  description: string
  salary_estimate: SalaryRange
  match_score: number
  match_rationale: string
  company_url?: string
  company_industry?: string
  company_country?: string
  company_addresses?: string[]
  company_employees_label?: string
  company_revenue_label?: string
  company_description?: string
  company_logo?: string
  job_url?: string
  location_country?: string
  location_city?: string
  location_state?: string
  job_type?: string
  job_function?: string
  salary_interval?: string
  salary_min_amount?: number
  salary_max_amount?: number
  salary_currency?: string
  salary_source?: string
  date_posted?: DateString
  emails?: string[]
  is_remote?: boolean
  job_level?: string
  search_term?: string
}

export type ApiResponse<T> = {
  ok: boolean
  data?: T
  error?: string
}
