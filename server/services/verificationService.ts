import { RAGSourceItem, VerificationReport, VerificationStatus } from '../../src/types';

export function verifyAnswerAgainstEvidence(
  answer: string,
  retrievedSources: RAGSourceItem[],
  isSafetyOverride = false
): VerificationReport {
  if (isSafetyOverride) {
    return {
      status: 'SAFETY_OVERRIDE',
      confidenceScore: 1.0,
      citedSources: ['National Cybercrime Protocol (1930) / All-Emergency (112)'],
      evidenceFound: true,
      notes: 'Response triggered a priority safety or emergency protocol to prevent fraud or injury.',
    };
  }

  if (retrievedSources.length === 0) {
    return {
      status: 'GENERAL_GUIDANCE',
      confidenceScore: 0.72,
      citedSources: [],
      evidenceFound: false,
      notes: 'No specific approved educational document chunk matched; answer provides safe general guidance.',
    };
  }

  const citedSources = Array.from(new Set(retrievedSources.map((r) => r.title)));

  // Extract non-trivial words from the answer
  const answerTokens = answer
    .toLowerCase()
    .replace(/[^\w\s\u0900-\u097F]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 3);

  const combinedEvidenceText = retrievedSources
    .map((r) => `${r.title} ${r.content || ''}`.toLowerCase())
    .join(' ');

  let supportedTokens = 0;
  for (const token of answerTokens) {
    if (combinedEvidenceText.includes(token)) {
      supportedTokens++;
    }
  }

  const overlapRatio = answerTokens.length > 0 ? supportedTokens / answerTokens.length : 0;

  let status: VerificationStatus = 'PARTIALLY_GROUNDED';
  let confidenceScore = 0.8;

  if (overlapRatio > 0.28) {
    status = 'VERIFIED';
    confidenceScore = 0.95;
  } else if (overlapRatio > 0.12) {
    status = 'PARTIALLY_GROUNDED';
    confidenceScore = 0.84;
  } else {
    status = 'GENERAL_GUIDANCE';
    confidenceScore = 0.68;
  }

  return {
    status,
    confidenceScore: Math.round(confidenceScore * 100) / 100,
    citedSources,
    evidenceFound: true,
    notes:
      status === 'VERIFIED'
        ? 'Answer closely aligns with verified educational materials.'
        : 'Answer combines approved educational steps with conversational guidance.',
  };
}
