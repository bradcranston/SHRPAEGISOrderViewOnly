# SHRP AEGIS Order View Only

A streamlined, view-only interface for displaying Aegis drug test orders without edit functionality.

## 🚀 Features

### View-Only Interface
- **No Edit Buttons**: All edit, submit, and cancel buttons have been removed
- **Clean Layout**: Streamlined design focused on data readability
- **Responsive Design**: Optimized for desktop, tablet, and mobile viewing
- **Print-Friendly**: Enhanced styling for document printing

### Improved Data Display
- **Better Typography**: Enhanced fonts and spacing for improved readability
- **Visual Hierarchy**: Clear section organization with proper headings
- **Grid Layout**: Responsive grid system for organized data presentation
- **Empty State Handling**: Graceful handling of missing or empty data fields

### Enhanced Styling
- **Modern UI**: Updated with contemporary design patterns
- **Consistent Spacing**: Improved spacing throughout the interface
- **Better Contrast**: Enhanced color scheme for better accessibility
- **Card-Based Layout**: Organized sections in clean card containers
- **Done Button**: Professional green button to complete the order review process

### FileMaker Integration
- **Done Button**: Calls FileMaker script `CloseLabOrder` when clicked
- **Multiple Fallback Methods**: Uses fmp:// protocol, JavaScript API, and custom events
- **Error Handling**: Graceful fallback with user feedback if FileMaker is unavailable

## 📁 File Structure

```
├── index.html                 # Main view-only interface (fully self-contained)
├── index-standalone.html      # Identical standalone version for guaranteed local file compatibility
├── src/
│   ├── index-view-only.js     # View-only JavaScript logic (now inlined in HTML files)
│   ├── index.js               # Original JavaScript (preserved for reference)
│   ├── style.css              # Updated CSS (now inlined in HTML files)
│   ├── aoedropdowns.json      # AOE dropdown data
│   ├── aoequestions.json      # AOE questions data
│   └── ordercodes.json        # Order codes data
├── scripts/                   # Original scripts (preserved)
├── test-populate-function.html # Test file demonstrating data population functionality
├── test_validation.html       # Validation test file
├── package.json              # Project configuration
└── README.md                 # This file
```

## 🔧 Usage

### Opening the Interface
1. Open `index.html` or `index-standalone.html` in a web browser to view the main interface
2. Both files are fully self-contained and work without external dependencies
3. Use `index-standalone.html` for guaranteed compatibility when opening local files
4. Open `test-populate-function.html` to test the enhanced data population functionality

### Populating Data
The interface provides JavaScript functions for external data population:

```javascript
// Basic usage - supports multiple data formats
populateFormData(dataObject);

// Alias for backward compatibility
populateDisplayData(dataObject);

// Add individual order request
addOrderRequest(orderCode, orderDescription, observations);

// Clear all order requests
clearOrderRequests();

// Call FileMaker script (for Done button functionality)
callFileMakerScript('CloseLabOrder');
```

**Data Format Compatibility:**
The interface supports both original format (with underscores) and new format (without underscores):

```javascript
// Original format (as used by populateFormFromJSON)
window.populateDisplayData({
  'MSH_4': 'AEGIS001',
  'PID_5': 'John Doe',
  'PID_7': '01/15/1980',
  'OBR_16': 'Dr. Johnson'
});

// New format (direct element mapping)
window.populateDisplayData({
  'MSH4': 'AEGIS001', 
  'PID5': 'John Doe',
  'PID7': '01/15/1980',
  'OBR16': 'Dr. Johnson'
});

// Mixed format (both work together)
window.populateDisplayData({
  'MSH_4': 'AEGIS001',      // Original format
  'PID5': 'John Doe',       // New format
  'OBR1_OrderCode': 'DRUG-SCREEN-5',  // Order requests
  'OBR1_OrderDescription': '5-Panel Drug Screen'
});
```

### Order Request Data Format
The enhanced `populateDisplayData` function now automatically processes order requests from JSON data using the following pattern:

- **OBR Data**: `OBR{index}_OrderCode` and `OBR{index}_OrderDescription`
- **OBX Data**: `OBR{index}_OBX{obsIndex}_Question` and `OBR{index}_OBX{obsIndex}_Answer`

Example:
```javascript
{
  "OBR1_OrderCode": "DRUG-SCREEN-5",
  "OBR1_OrderDescription": "5-Panel Drug Screen",
  "OBR1_OBX1_Question": "Collection method",
  "OBR1_OBX1_Answer": "Urine",
  "OBR1_OBX2_Question": "Collection date",
  "OBR1_OBX2_Answer": "01/15/2024"
}
```

### Testing with Sample Data
Uncomment the line in `src/index-view-only.js` to load sample data:
```javascript
// loadSampleData();
```

## 🎨 Design Changes

### Before (Original)
- Edit buttons on every section
- Form-based layout with input fields
- Submit and cancel buttons
- Modal dialogs for editing
- Interactive dropdowns and validation

### After (View-Only)
- Clean, card-based sections
- Read-only data display
- No interactive elements
- Streamlined layout
- Enhanced typography and spacing

## 📱 Responsive Design

The interface is fully responsive and adapts to different screen sizes:

- **Desktop**: 3-column grid layout for optimal space usage
- **Tablet**: 2-column layout with adjusted spacing
- **Mobile**: Single-column layout with touch-friendly elements

## 🖨️ Print Support

Enhanced print styles ensure the interface looks professional when printed:

- Optimized colors for print
- Proper page breaks
- Consistent formatting
- Clean margins and spacing

## 🔗 JavaScript API

The interface exposes several functions for external integration:

- `populateDisplayData(data)`: **Enhanced** - Populate form fields AND order requests from JSON data
- `populateFormData(data)`: Alias for `populateDisplayData` for backward compatibility
- `addOrderRequestDisplay(code, description, observations)`: Manually add individual order request
- `clearOrderRequests()`: Clear all order requests from display
- `formatDate(dateString)`: Format dates for display
- `formatPhoneNumber(phoneString)`: Format phone numbers
- `loadSampleData()`: Load sample data including order requests for testing

## 📋 Data Fields

### Aegis Lab Information
- Client ID
- Date and Time
- Order Number

### Patient Information
- Patient ID & Type
- Name, DOB, Sex, Race
- Address (full address fields)
- Phone, SSN, Ethnic Group

### Provider & Billing
- Referring Doctor
- Ordering Provider
- Collection Date/Time
- Specimen details
- Billing codes

### Insurance Information
- Company details
- Insured person details
- Policy information

### Guarantor Information
- Name and contact details
- Address information

### Order Requests
- Order codes and descriptions
- Observations with questions and answers

## 🛠️ Customization

### Styling
Modify `src/style.css` to customize:
- Colors and themes
- Typography
- Spacing and layout
- Print styles

### Functionality
Extend `src/index-view-only.js` to add:
- Data validation
- Export functionality
- Additional formatting

## 🔧 Technical Requirements

- Modern web browser with JavaScript support
- No server-side requirements
- Compatible with all major browsers
- Responsive design works on all devices

## 📈 Performance

- Lightweight with minimal JavaScript
- Fast loading with optimized CSS
- No external dependencies except Tailwind CSS CDN
- Efficient data rendering

## 🤝 Contributing

To contribute to this project:
1. Test the interface thoroughly
2. Maintain the view-only nature
3. Follow the existing code style
4. Update documentation as needed

## 📞 Support

For issues or questions:
- Check the demo page for examples
- Review the JavaScript console for errors
- Ensure proper data format when populating fields
- Verify browser compatibility

---

## Original FileMaker Development Kit

This project was originally based on a FileMaker JavaScript development kit. The original functionality included:

- Development environment for FileMaker widgets
- npm scripts for building and uploading to FileMaker
- Live reloading during development
- Integration with FileMaker Pro

To use the original FileMaker development features:
1. `npm install`
2. `npm start`
3. Open the `jsDev.fmp12` file
4. Allow it to work in Dev mode

*This interface is now optimized as a view-only display for Aegis drug test orders, focusing on readability and ease of use.*
