#!/bin/bash
wifi_info=$(sudo wdutil info) # Replace with the actual command
extracted_string=$(echo "$wifi_info" | grep -oE '\s+[^\s]+\s+dBm')
echo "${extracted_string[0]}" | cut -d ' ' -f 23
