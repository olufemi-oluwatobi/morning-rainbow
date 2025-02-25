// Adding to existing types...

export interface JobPost {
  id: string
  title: string
  company: string
  location: string
  description: string
  salary_estimate: Record<string, any> | null
  match_score: number | null
  match_rationale: string | null
}

export interface DetailedJobPost extends JobPost {
  company_url: string | null
  company_industry: string | null
  company_country: string | null
  company_addresses: string[] | null
  company_employees_label: string | null
  company_revenue_label: string | null
  company_description: string | null
  company_logo: string | null
  job_url: string | null
  location_country: string | null
  location_city: string | null
  location_state: string | null
  job_type: string | null
  job_function: string | null
  salary_interval: string | null
  salary_min_amount: number | null
  salary_max_amount: number | null
  salary_currency: string | null
  salary_source: string | null
  date_posted: string | null
  emails: string[] | null
  is_remote: boolean | null
  job_level: string | null
  search_term: string | null
}

export interface BoardJobsResponse {
  total_jobs: number
  jobs: DetailedJobPost[]
  similar_boards: Record<string, any>[]
}

