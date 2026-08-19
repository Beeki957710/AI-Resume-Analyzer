from pydantic import BaseModel, Field
from typing import List

class ATSAnalysisResult(BaseModel):
    match_score: int = Field(description="ATS match score from 0 to 100 based on job fit.")
    matching_skills: List[str] = Field(description="Skills present in both resume and job description.")
    missing_skills: List[str] = Field(description="Critical skills missing from the resume.")
    key_strengths: List[str] = Field(description="Top 3-5 key candidate strengths.")
    summary_verdict: str = Field(description="Short executive evaluation summary.")

    