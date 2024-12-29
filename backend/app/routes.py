from flask import Blueprint, request, jsonify
from .models.process import Process
from .schedulers.fcfs import FCFSScheduler
from .schedulers.sjf import SJFScheduler
from .schedulers.round_robin import RoundRobinScheduler
from .schedulers.priority import PriorityScheduler
from typing import List, Dict

api = Blueprint('api', __name__)

SCHEDULERS = {
    'fcfs': FCFSScheduler,
    'sjf': SJFScheduler,
    'round_robin': RoundRobinScheduler,
    'priority': PriorityScheduler
}

@api.route('/simulate', methods=['POST'])
def simulate():
    data = request.get_json()
    algorithm = data.get('algorithm', 'fcfs').lower()
    processes_data = data.get('processes', [])
    time_quantum = data.get('time_quantum', 2)  # For Round Robin
    
    if algorithm not in SCHEDULERS:
        return jsonify({'error': f'Unknown algorithm: {algorithm}'}), 400
    
    # Create Process objects
    processes = [
        Process(
            pid=p['pid'],
            arrival_time=p['arrival_time'],
            burst_time=p['burst_time'],
            priority=p.get('priority')
        )
        for p in processes_data
    ]
    
    # Initialize appropriate scheduler
    scheduler_class = SCHEDULERS[algorithm]
    scheduler = (
        scheduler_class(time_quantum=time_quantum) 
        if algorithm == 'round_robin' 
        else scheduler_class()
    )
    
    # Add processes and run simulation
    for process in processes:
        scheduler.add_process(process)
    
    scheduler.schedule()
    
    # Return results
    return jsonify(scheduler.get_metrics())

@api.route('/algorithms', methods=['GET'])
def get_algorithms():
    return jsonify(list(SCHEDULERS.keys())) 