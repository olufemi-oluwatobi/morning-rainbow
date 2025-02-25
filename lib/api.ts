// Previous imports and code...

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"

interface Profile {
  name: string
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
  website: string
  skills: string[]
  experience: Experience[]
  education: Education[]
}

interface Experience {
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  description: string
}

interface Education {
  school: string
  degree: string
  location: string
  startDate: string
  endDate: string
  description: string
}

interface UserProfile {
  id: string
  name: string
  email: string
  profile: Profile
}

interface GenerateRequest {
  job_description: string
  cv_text: string
  user_profile: string
}

interface CVResponse {
  cv_text: string
}

interface CoverLetterResponse {
  cover_letter_text: string
}

interface SalaryEstimate {
  min: number
  max: number
  currency: string
}

interface JobPost {
  id: string
  title: string
  company: string
  location: string
  description: string
  salary_estimate: SalaryEstimate
  match_score: number
  match_rationale: string
}

interface BoardJobsResponse {
  total_jobs: number
  jobs: JobPost[]
  similar_boards: {
    id: string
    name: string
    job_count: number
  }[]
}

export const api = {
  createFastTrackBoard: async (data: { prompt: string }) => {
    const response = await fetch(`${API_BASE_URL}/boards/fast-track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to create fast track board: ${errorText}`)
    }
    return response.json()
  },
  // Existing methods...

  // Profile Management
  createProfile: async (data: Profile) => {
    const response = await fetch(`${API_BASE_URL}/profiles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to create profile: ${errorText}`)
    }
    return response.json()
  },

  getUserProfile: async (userId: string): Promise<UserProfile> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/profile`)
    if (!response.ok) {
      throw new Error("Failed to fetch user profile")
    }
    return response.json()
  },

  // CV Management
  uploadCV: async (userId: string, file: File) => {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch(`${API_BASE_URL}/cv?user_id=${userId}`, {
      method: "POST",
      body: formData,
    })
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to upload CV: ${errorText}`)
    }
    return response.json()
  },

  getCVText: async (cvId: string): Promise<string> => {
    const response = await fetch(`${API_BASE_URL}/cv/${cvId}/text`)
    if (!response.ok) {
      throw new Error("Failed to get CV text")
    }
    return response.json()
  },

  attachCVToBoard: async (boardId: string, cvId: string) => {
    const response = await fetch(`${API_BASE_URL}/boards/${boardId}/cv?cv_id=${cvId}`, {
      method: "POST",
    })
    if (!response.ok) {
      throw new Error("Failed to attach CV to board")
    }
    return response.json()
  },

  // CV Generation
  generateCV: async (params: GenerateRequest): Promise<CVResponse> => {
    const queryString = new URLSearchParams(params as Record<string, string>).toString()
    const response = await fetch(`${API_BASE_URL}/generate-cv?${queryString}`, {
      method: "POST",
    })
    if (!response.ok) {
      throw new Error("Failed to generate CV")
    }
    return response.json()
  },

  // Cover Letter Generation
  generateCoverLetter: async (params: GenerateRequest): Promise<CoverLetterResponse> => {
    const queryString = new URLSearchParams(params as Record<string, string>).toString()
    const response = await fetch(`${API_BASE_URL}/generate-cover-letter?${queryString}`, {
      method: "POST",
    })
    if (!response.ok) {
      throw new Error("Failed to generate cover letter")
    }
    return response.json()
  },

  getAllJobs: async (): Promise<JobPost[]> => {
    // For development, return dummy data
    return [
      {
        id: "1",
        title: "Senior Frontend Developer",
        company: "TechCorp",
        location: "San Francisco, CA",
        description: "We're looking for an experienced frontend developer...",
        salary_estimate: {
          min: 120000,
          max: 150000,
          currency: "USD",
        },
        match_score: 92,
        match_rationale: "Strong match based on your React and TypeScript experience",
      },
      {
        id: "2",
        title: "Lead Product Designer",
        company: "DesignHub",
        location: "Remote",
        description: "Join our design team to create beautiful interfaces...",
        salary_estimate: {
          min: 110000,
          max: 140000,
          currency: "USD",
        },
        match_score: 88,
        match_rationale: "Your design system experience aligns well",
      },
      // Add more dummy jobs as needed
    ]
  },

  getBoardJobs: async (boardId: string): Promise<BoardJobsResponse> => {
    // For development, return dummy data
    return {
      total_jobs: 2,
      jobs: [
        {
          id: "1",
          title: "Senior Frontend Developer",
          company: "TechCorp",
          location: "San Francisco, CA",
          description: "We're looking for an experienced frontend developer...",
          salary_estimate: {
            min: 120000,
            max: 150000,
            currency: "USD",
          },
          match_score: 92,
          match_rationale: "Strong match based on your React and TypeScript experience",
          company_url: "https://techcorp.com",
          company_industry: "Technology",
          company_country: "United States",
          company_addresses: ["123 Tech St, San Francisco, CA"],
          company_employees_label: "1000-5000",
          company_revenue_label: "$50M-$100M",
          company_description: "Leading technology company...",
          company_logo: "/placeholder.svg?height=40&width=40",
          job_url: "https://techcorp.com/careers/123",
          location_country: "United States",
          location_city: "San Francisco",
          location_state: "CA",
          job_type: "Full-time",
          job_function: "Engineering",
          salary_interval: "yearly",
          salary_min_amount: 120000,
          salary_max_amount: 150000,
          salary_currency: "USD",
          salary_source: "company",
          date_posted: "2024-02-25T00:00:00Z",
          emails: ["jobs@techcorp.com"],
          is_remote: false,
          job_level: "Senior",
          search_term: "frontend developer",
        },
        // Add more detailed dummy jobs as needed
      ],
      similar_boards: [
        {
          id: "board2",
          name: "Frontend Engineer",
          job_count: 156,
        },
        {
          id: "board3",
          name: "React Developer",
          job_count: 203,
        },
      ],
    }
  },
}

