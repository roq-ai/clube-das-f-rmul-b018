import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { medicationFormulaValidationSchema } from 'validationSchema/medication-formulas';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.medication_formula
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getMedicationFormulaById();
    case 'PUT':
      return updateMedicationFormulaById();
    case 'DELETE':
      return deleteMedicationFormulaById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getMedicationFormulaById() {
    const data = await prisma.medication_formula.findFirst(convertQueryToPrismaUtil(req.query, 'medication_formula'));
    return res.status(200).json(data);
  }

  async function updateMedicationFormulaById() {
    await medicationFormulaValidationSchema.validate(req.body);
    const data = await prisma.medication_formula.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteMedicationFormulaById() {
    const data = await prisma.medication_formula.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
