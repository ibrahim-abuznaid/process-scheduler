from typing import List, Dict
from .base import BaseScheduler
from ..models.process import Process

class PriorityScheduler(BaseScheduler):
    def schedule(self) -> List[Dict]:
        self.current_time = 0
        self.execution_timeline = []
        remaining_processes = self.processes.copy()
        
        while remaining_processes:
            # Get available processes at current time
            available_processes = [
                p for p in remaining_processes 
                if p.arrival_time <= self.current_time
            ]
            
            if not available_processes:
                # No processes available, move time to next arrival
                self.current_time = min(p.arrival_time for p in remaining_processes)
                continue
            
            # Select process with highest priority (lower number = higher priority)
            selected_process = min(
                available_processes,
                key=lambda p: (p.priority if p.priority is not None else float('inf'))
            )
            
            selected_process.start_time = self.current_time
            selected_process.completion_time = self.current_time + selected_process.burst_time
            
            self.add_to_timeline(
                selected_process.pid,
                self.current_time,
                selected_process.completion_time
            )
            
            self.current_time = selected_process.completion_time
            remaining_processes.remove(selected_process)
            
        return self.execution_timeline 