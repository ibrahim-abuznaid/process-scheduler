from typing import List, Dict
from collections import deque
from .base import BaseScheduler
from ..models.process import Process

class RoundRobinScheduler(BaseScheduler):
    def __init__(self, time_quantum: int = 2):
        super().__init__()
        self.time_quantum = time_quantum
    
    def schedule(self) -> List[Dict]:
        self.current_time = 0
        self.execution_timeline = []
        
        # Initialize ready queue and remaining processes
        ready_queue = deque()
        remaining_processes = self.processes.copy()
        
        while remaining_processes or ready_queue:
            # Add newly arrived processes to ready queue
            newly_arrived = [
                p for p in remaining_processes
                if p.arrival_time <= self.current_time
            ]
            
            for process in newly_arrived:
                ready_queue.append(process)
                remaining_processes.remove(process)
            
            if not ready_queue:
                # No processes in ready queue, move time to next arrival
                if remaining_processes:
                    self.current_time = min(p.arrival_time for p in remaining_processes)
                continue
            
            # Get next process from ready queue
            current_process = ready_queue.popleft()
            
            # Set start time if process hasn't started yet
            if current_process.start_time is None:
                current_process.start_time = self.current_time
            
            # Calculate execution time for this quantum
            execution_time = min(
                self.time_quantum,
                current_process.remaining_time
            )
            
            # Add to timeline
            self.add_to_timeline(
                current_process.pid,
                self.current_time,
                self.current_time + execution_time
            )
            
            # Update process state
            current_process.remaining_time -= execution_time
            self.current_time += execution_time
            
            # Check if process is complete
            if current_process.remaining_time > 0:
                # Add back to ready queue if not complete
                ready_queue.append(current_process)
            else:
                current_process.completion_time = self.current_time
            
        return self.execution_timeline 