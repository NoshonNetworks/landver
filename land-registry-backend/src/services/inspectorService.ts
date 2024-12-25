import { query } from './db';
import { Inspector, InspectorAssignment } from '../types';

export async function getAllInspectors(): Promise<Inspector[]> {
  const result = await query(`
    SELECT * FROM inspectors 
    WHERE is_active = true
  `);
  return result.rows;
}

export async function getInspectorAssignments(inspectorAddress: string): Promise<InspectorAssignment[]> {
  const result = await query(`
    SELECT ia.*, l.* 
    FROM inspector_assignments ia
    JOIN lands l ON ia.land_id = l.land_id
    WHERE ia.inspector_address = $1
    ORDER BY ia.timestamp DESC
  `, [inspectorAddress]);
  return result.rows;
} 