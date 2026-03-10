from typing import List, Optional
from pydantic import BaseModel, Field

class Reference(BaseModel):
    title: str = Field(description="The title of the reference article or source.")
    url: str = Field(description="The URL or internal link to the source.")

class ServiceStep(BaseModel):
    step_number: int = Field(description="The order number of this step, starting from 1.")
    title: str = Field(description="Short title of the step.")
    description: str = Field(description="Detailed description of what the user needs to do in this step.")

class UsefulLink(BaseModel):
    label: str = Field(description="Label for the actionable link, like 'Apply here', 'Log in to Skatteetaten', or 'Read more'.")
    url: str = Field(description="The target URL.")

class ContactInfo(BaseModel):
    agency_name: str = Field(description="Name of the government agency or department.")
    phone: Optional[str] = Field(None, description="Phone number if available.")
    email: Optional[str] = Field(None, description="Email address if available.")
    url: Optional[str] = Field(None, description="URL pointing to their contact page.")

class SemanticResponse(BaseModel):
    """
    Represents the semantic data returned by the agent. 
    The frontend client will map this data to their own UI components.
    """
    summary: str = Field(description="The exact extracted portion of the text that contains the answer. Do not summarize, use verbatim extracted text.")
    steps: Optional[List[ServiceStep]] = Field(default_factory=list, description="If the user asks for a procedure or 'how to' guide, break it down into sequential steps here.")
    references: Optional[List[Reference]] = Field(default_factory=list, description="Sources or articles used to answer the question, usually from data.norge.no or similar.")
    useful_links: Optional[List[UsefulLink]] = Field(default_factory=list, description="Actionable links relevant to the user's intent.")
    contact_info: Optional[List[ContactInfo]] = Field(default_factory=list, description="Contact information if the user needs to reach out to an agency for help.")
