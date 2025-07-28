import nmap
import json

def scan_network(ip_range):
    """Scans the network for live devices."""
    nm = nmap.PortScanner()
    try:
        nm.scan(hosts=ip_range, arguments='-sn')
        active_devices = []
        for host in nm.all_hosts():
            if 'mac' in nm[host]['addresses']:
                active_devices.append({
                    'ip': host,
                    'mac': nm[host]['addresses']['mac'],
                    'vendor': nm[host]['vendor'].get(nm[host]['addresses']['mac'], 'Unknown')
                })
            else:
                 active_devices.append({
                    'ip': host,
                    'mac': 'N/A',
                    'vendor': 'Unknown'
                })
        return active_devices
    except nmap.PortScannerError as e:
        return {"error": str(e)}
    except Exception as e:
        return {"error": str(e)}

if __name__ == '__main__':
    # Example usage (for testing)
    ip_range = "192.168.1.0/24"
    devices = scan_network(ip_range)
    print(json.dumps(devices, indent=2))