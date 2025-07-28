from flask import Blueprint, request, jsonify
from ..app.network_scan import scan_network

api_bp = Blueprint('api', __name__, url_prefix='/api')

@api_bp.route('/scan/network', methods=['POST'])
def network_scan_route():
    data = request.get_json()
    ip_range = data.get('ip_range')
    if not ip_range:
        return jsonify({'error': 'Missing ip_range parameter'}), 400
    
    scan_results = scan_network(ip_range)
    return jsonify(scan_results)