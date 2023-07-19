import axios from 'axios';
import queryString from 'query-string';
import { MedicationFormulaInterface, MedicationFormulaGetQueryInterface } from 'interfaces/medication-formula';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getMedicationFormulas = async (
  query?: MedicationFormulaGetQueryInterface,
): Promise<PaginatedInterface<MedicationFormulaInterface>> => {
  const response = await axios.get('/api/medication-formulas', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createMedicationFormula = async (medicationFormula: MedicationFormulaInterface) => {
  const response = await axios.post('/api/medication-formulas', medicationFormula);
  return response.data;
};

export const updateMedicationFormulaById = async (id: string, medicationFormula: MedicationFormulaInterface) => {
  const response = await axios.put(`/api/medication-formulas/${id}`, medicationFormula);
  return response.data;
};

export const getMedicationFormulaById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/medication-formulas/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteMedicationFormulaById = async (id: string) => {
  const response = await axios.delete(`/api/medication-formulas/${id}`);
  return response.data;
};
