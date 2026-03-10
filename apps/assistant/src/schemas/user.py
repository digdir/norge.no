from pydantic import BaseModel, Field
from typing import List

class ProjectInfo(BaseModel):
    name: str = Field(description="The name of the project")
    status: str = Field(description="The current status of the project")

class UserInfoProps(BaseModel):
    name: str = Field(description="The full name of the user")
    status: str = Field(description="The current status of the user (e.g., Active, Inactive)")
    role: str = Field(description="The user's role or job title")
    bio: str = Field(description="A short biography of the user")
    projects: List[ProjectInfo] = Field(description="A list of projects the user is associated with")

class UserInfoCard(BaseModel):
    component_name: str = "UserInfoCard"
    props: UserInfoProps