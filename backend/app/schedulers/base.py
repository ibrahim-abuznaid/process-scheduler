from abc import ABC, abstractmethod
from typing import List, Dict
from ..models.process import Process

class BaseScheduler(ABC):
    def __init__(self):
        self.processes: List[Process] = []
        self.current_time: int = 0
        self.execution_timeline: List[Dict] = []
    
    @abstractmethod
    def schedule(self) -> List[Dict]:
        """
        Implement the scheduling algorithm
        Returns: Timeline of process execution
        """
        pass
    
    def add_process(self, process: Process):
        self.processes.append(process)
    
    def add_to_timeline(self, pid: int, start: int, end: int):
        self.execution_timeline.append({
            'pid': pid,
            'start': start,
            'end': end
        })
    
    def get_metrics(self) -> Dict:
        """Calculate and return scheduling metrics"""
        if not self.processes:
            return {}
            
        avg_waiting_time = sum(p.waiting_time for p in self.processes) / len(self.processes)
        avg_turnaround_time = sum(p.turnaround_time for p in self.processes) / len(self.processes)
        avg_response_time = sum(p.response_time for p in self.processes) / len(self.processes)
        
        return {
            'avg_waiting_time': avg_waiting_time,
            'avg_turnaround_time': avg_turnaround_time,
            'avg_response_time': avg_response_time,
            'timeline': self.execution_timeline
        } 