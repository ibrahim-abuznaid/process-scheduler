from dataclasses import dataclass
from typing import Optional

@dataclass
class Process:
    pid: int
    arrival_time: int
    burst_time: int
    priority: Optional[int] = None
    
    # Runtime attributes
    start_time: Optional[int] = None
    completion_time: Optional[int] = None
    remaining_time: Optional[int] = None
    
    def __post_init__(self):
        self.remaining_time = self.burst_time
    
    @property
    def waiting_time(self) -> Optional[int]:
        if self.start_time is None:
            return None
        return self.start_time - self.arrival_time
    
    @property
    def turnaround_time(self) -> Optional[int]:
        if self.completion_time is None:
            return None
        return self.completion_time - self.arrival_time
    
    @property
    def response_time(self) -> Optional[int]:
        return self.waiting_time 