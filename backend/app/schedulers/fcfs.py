from typing import List, Dict
from .base import BaseScheduler
from ..models.process import Process

class FCFSScheduler(BaseScheduler):
    def schedule(self) -> List[Dict]:
        # Sort processes by arrival time
        self.processes.sort(key=lambda x: x.arrival_time)
        
        self.current_time = 0
        self.execution_timeline = []
        
        for process in self.processes:
            # If there's a gap between processes, move current time forward
            if self.current_time < process.arrival_time:
                self.current_time = process.arrival_time
            
            process.start_time = self.current_time
            process.completion_time = self.current_time + process.burst_time
            
            self.add_to_timeline(
                process.pid,
                self.current_time,
                process.completion_time
            )
            
            self.current_time = process.completion_time
            
        return self.execution_timeline 