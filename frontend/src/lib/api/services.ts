import apiClient from './client'

export const hospitalApi = {
  list: (params?: Record<string, string | number>) =>
    apiClient.get('/HospitalDrf/', { params }),
  suggest: (search: string) =>
    apiClient.get('/HospitalSugDrf/', { params: { search } }),
  offices: (hospitalId: number) =>
    apiClient.get('/HospitalOfficeDrf/', { params: { hospital_id: hospitalId } }),
  score: (hospitalId: number) =>
    apiClient.get('/HospitalScoreDrf/', { params: { hospital_id: hospitalId } }),
}

export const itemApi = {
  list: (params?: Record<string, string>) =>
    apiClient.get('/SearchItemDrf/', { params }),
  detail: (id: number) => apiClient.get(`/SearchItemDrf/${id}/`),
}

export const mutualApi = {
  list: (params?: Record<string, string | number>) =>
    apiClient.get('/AllMutualRecognitionDrf/', { params }),
}

export const projectCvApi = {
  list: (params?: Record<string, string | number>) =>
    apiClient.get('/ProjectMonthCvDrf/', { params }),
}

export const outdoorApi = {
  data: (params?: Record<string, string | number>) =>
    apiClient.get('/OutdoorDataDrf/', { params }),
  offsetCurve: (params?: Record<string, string | number>) =>
    apiClient.get('/OutdoorOffsetCurveDrf/', { params }),
}
