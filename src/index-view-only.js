// View-Only Interface JavaScript
// This file provides basic functionality for displaying data in the view-only interface

// Function to populate form data (for external use)
function populateFormData(data) {
  const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
  if (!parsedData || typeof parsedData !== 'object') return;
  
  // Populate display spans for all basic fields
  Object.keys(parsedData).forEach(key => {
    // Skip OBR/OBX fields as they are handled separately
    if (key.startsWith('OBR') && (key.includes('_OrderCode') || key.includes('_OrderDescription') || key.includes('_OBX'))) {
      return;
    }
    
    const element = document.getElementById(`display-${key}`);
    if (element) {
      element.textContent = parsedData[key] || '-';
    }
  });
  
  // Handle order requests (OBR/OBX data)
  const orderRequestsContainer = document.getElementById('orderRequestsDisplay');
  if (orderRequestsContainer) {
    // Clear existing order requests
    clearOrderRequests();
    
    // Find all OBR indices
    const obrIndices = Array.from(new Set(Object.keys(parsedData)
      .filter(k => /^OBR\d+_OrderCode$/.test(k))
      .map(k => k.match(/^OBR(\d+)_OrderCode$/)[1])))
      .sort((a, b) => Number(a) - Number(b));
    
    obrIndices.forEach(idx => {
      const orderCode = parsedData[`OBR${idx}_OrderCode`] || '';
      const orderDescription = parsedData[`OBR${idx}_OrderDescription`] || '';
      
      // Find all OBX observations for this OBR
      const obxNums = Object.keys(parsedData)
        .filter(k => k.startsWith(`OBR${idx}_OBX`) && k.match(new RegExp(`^OBR${idx}_OBX(\\d+)_Question$`)))
        .map(k => k.match(new RegExp(`^OBR${idx}_OBX(\\d+)_Question$`))[1])
        .sort((a, b) => Number(a) - Number(b));
      
      const observations = obxNums.map(obxNum => ({
        question: parsedData[`OBR${idx}_OBX${obxNum}_Question`] || '',
        answer: parsedData[`OBR${idx}_OBX${obxNum}_Answer`] || ''
      }));
      
      // Add the order request to the display
      addOrderRequest(orderCode, orderDescription, observations);
    });
  }
}

// Function to add order request display
function addOrderRequest(orderCode, orderDescription, observations = []) {
  const container = document.getElementById('orderRequestsDisplay');
  
  if (!container) {
    console.warn('Order requests container not found');
    return;
  }
  
  // Remove the "no orders" message if it exists
  const noOrdersMsg = container.querySelector('.text-gray-500');
  if (noOrdersMsg) {
    noOrdersMsg.remove();
  }
  
  const orderDiv = document.createElement('div');
  orderDiv.className = 'bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500';
  
  orderDiv.innerHTML = `
    <div class="mb-3">
      <div class="flex flex-col mb-2">
        <span class="text-sm font-medium text-gray-600">Order Code</span>
        <span class="text-lg font-semibold text-gray-900">${orderCode || '-'}</span>
      </div>
      <div class="flex flex-col">
        <span class="text-sm font-medium text-gray-600">Order Description</span>
        <span class="text-lg text-gray-900">${orderDescription || '-'}</span>
      </div>
    </div>
    ${observations.length > 0 ? `
      <div class="border-t pt-3">
        <h4 class="text-md font-medium text-gray-800 mb-2">Observations</h4>
        <div class="space-y-2">
          ${observations.map(obs => `
            <div class="bg-white rounded p-3 border">
              <div class="flex flex-col mb-1">
                <span class="text-sm font-medium text-gray-600">Question</span>
                <span class="text-gray-900">${obs.question || '-'}</span>
              </div>
              <div class="flex flex-col">
                <span class="text-sm font-medium text-gray-600">Answer</span>
                <span class="text-gray-900 font-medium">${obs.answer || '-'}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}
  `;
  
  container.appendChild(orderDiv);
}

// Function to clear all order requests
function clearOrderRequests() {
  const container = document.getElementById('orderRequestsDisplay');
  if (container) {
    container.innerHTML = '<div class="text-gray-500 italic">No order requests to display</div>';
  }
}

// Function to format date for display
function formatDate(dateString) {
  if (!dateString) return '-';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return dateString;
  }
}

// Function to format phone number for display
function formatPhoneNumber(phoneString) {
  if (!phoneString) return '-';
  
  // Remove all non-digit characters
  const digits = phoneString.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX if 10 digits
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  
  return phoneString;
}

// Function to load sample data for testing
function loadSampleData() {
  const sampleData = {
    'MSH4': 'AEGIS001',
    'MSH7': formatDate('2024-01-15T10:30:00'),
    'MSH10': 'ORD-2024-001',
    'PID2': 'PAT-12345',
    'PID25': 'MR',
    'PID5': 'John Doe',
    'PID7': '01/15/1980',
    'PID8': 'Male',
    'PID10': 'Caucasian',
    'PID11address': '123 Main Street',
    'PID11city': 'Anytown',
    'PID11state': 'ST',
    'PID11zip': '12345',
    'PID13': formatPhoneNumber('5551234567'),
    'PID19': 'XXX-XX-1234',
    'PID22': 'Non-Hispanic',
    'PV18': 'Dr. Smith',
    'OBR16': 'Dr. Johnson',
    'OBR7': formatDate('2024-01-15T09:00:00'),
    'OBR15': 'Urine',
    'OBR151': 'UR',
    'DG13': 'Z02.89',
    'IN147': 'Direct Bill (C)',
    // Order Request 1
    'OBR1_OrderCode': 'DRUG-SCREEN-5',
    'OBR1_OrderDescription': '5-Panel Drug Screen',
    'OBR1_OBX1_Question': 'Collection method',
    'OBR1_OBX1_Answer': 'Urine',
    'OBR1_OBX2_Question': 'Collection date',
    'OBR1_OBX2_Answer': '01/15/2024',
    'OBR1_OBX3_Question': 'Reason for test',
    'OBR1_OBX3_Answer': 'Pre-employment',
    // Order Request 2
    'OBR2_OrderCode': 'ALCOHOL-TEST',
    'OBR2_OrderDescription': 'Alcohol Test',
    'OBR2_OBX1_Question': 'Test type',
    'OBR2_OBX1_Answer': 'Breathalyzer',
    'OBR2_OBX2_Question': 'Test location',
    'OBR2_OBX2_Answer': 'On-site'
  };
  
  populateFormData(sampleData);
}

// Make functions available globally
window.populateFormData = populateFormData;
window.populateDisplayData = populateFormData; // Alias for backward compatibility
window.addOrderRequest = addOrderRequest;
window.clearOrderRequests = clearOrderRequests;
window.formatDate = formatDate;
window.formatPhoneNumber = formatPhoneNumber;
window.loadSampleData = loadSampleData;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  console.log('View-Only Interface loaded successfully');
  
  // You can uncomment the line below to load sample data for testing
  // loadSampleData();
});
