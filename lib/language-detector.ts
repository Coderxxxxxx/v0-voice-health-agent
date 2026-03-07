// Language and dialect detection for voice assistant
// Supports English (multiple accents/dialects) and Urdu (Roman and RTL)

type DetectedLanguage = 'en' | 'ur-roman' | 'ur-rtl'

// Keywords and patterns for language detection
const languagePatterns = {
  urdu: {
    // Roman Urdu keywords
    roman: [
      'aap', 'mera', 'hai', 'hain', 'kya', 'kaise', 'kaun', 'kab', 'kahan', 'kyun',
      'main', 'tum', 'hum', 'unhe', 'unhein', 'inhe', 'inhein',
      'tha', 'the', 'thi', 'theen', 'hun', 'ho', 'hou',
      'ne', 'se', 'ko', 'par', 'mein', 'ke', 'ki',
      'davayi', 'bimari', 'doctor', 'hospital', 'medicine',
      'pani', 'khana', 'sona', 'uthna', 'Jana', 'ana',
    ],
    // Urdu script keywords
    rtl: [
      'آپ', 'میرا', 'ہے', 'ہیں', 'کیا', 'کیسے', 'کون', 'کب', 'کہاں', 'کیوں',
      'میں', 'تم', 'ہم', 'انہیں', 'انھیں', 'ان',
      'تھا', 'تھے', 'تھی', 'تھیں', 'ہوں', 'ہو', 'ہو',
      'نے', 'سے', 'کو', 'پر', 'میں', 'کے', 'کی',
      'دوا', 'بیماری', 'ڈاکٹر', 'ہسپتال', 'دواؤں',
      'پانی', 'کھانا', 'سونا', 'اٹھنا', 'جانا', 'آنا',
    ]
  },
  english: [
    'the', 'a', 'is', 'are', 'was', 'were', 'be', 'have', 'has',
    'do', 'does', 'did', 'will', 'would', 'should', 'could', 'can',
    'medication', 'doctor', 'hospital', 'medicine', 'blood', 'pressure',
    'appointment', 'reminder', 'health', 'vitals', 'pulse', 'sugar',
  ]
}

// Detect language from user input text
export function detectLanguage(text: string): DetectedLanguage {
  if (!text) return 'en'
  
  const lowerText = text.toLowerCase()
  let urduRomanScore = 0
  let urduRtlScore = 0
  let englishScore = 0
  
  // Check for Urdu RTL script
  const urduRtlRegex = /[\u0600-\u06FF]/g
  const urduRtlMatches = text.match(urduRtlRegex) || []
  if (urduRtlMatches.length > text.length * 0.3) {
    return 'ur-rtl'
  }
  
  // Score based on keyword matches
  languagePatterns.english.forEach(keyword => {
    if (lowerText.includes(keyword)) {
      englishScore += 1
    }
  })
  
  languagePatterns.urdu.roman.forEach(keyword => {
    if (lowerText.includes(keyword)) {
      urduRomanScore += 1
    }
  })
  
  languagePatterns.urdu.rtl.forEach(keyword => {
    if (text.includes(keyword)) {
      urduRtlScore += 1
    }
  })
  
  // Check for Roman Urdu character patterns
  const romanUrduPatterns = /\b(aap|mera|kya|hai|hain|doctor|medicine|davayi)\b/gi
  const romanUrduMatches = lowerText.match(romanUrduPatterns) || []
  urduRomanScore += romanUrduMatches.length * 2
  
  // Determine detected language
  if (urduRtlScore > englishScore && urduRtlScore > urduRomanScore) {
    return 'ur-rtl'
  } else if (urduRomanScore > englishScore) {
    return 'ur-roman'
  }
  
  return 'en'
}

// Detect accent/dialect within English (British, American, Indian, Australian, etc.)
export function detectEnglishDialect(text: string): string {
  const lowerText = text.toLowerCase()
  
  // British English indicators
  if (/(colour|favour|grey|centre|realise|organise)\b/.test(lowerText)) {
    return 'British'
  }
  
  // Indian English indicators
  if (/(hai\s|hain\s|kya\s|nahi|beta|sir|madam|please|only)\b/.test(lowerText)) {
    return 'Indian'
  }
  
  // Australian English indicators
  if (/(mate|g\'day|reckon|arvo|servo)\b/.test(lowerText)) {
    return 'Australian'
  }
  
  return 'American'
}

// Transliterate between English and Roman Urdu
export function transliterateToRomanUrdu(urduRtlText: string): string {
  const transliterationMap: Record<string, string> = {
    'آ': 'aa', 'ا': 'a', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ٹ': 't',
    'ث': 'th', 'ج': 'j', 'چ': 'ch', 'ح': 'h', 'خ': 'kh', 'د': 'd',
    'ڈ': 'd', 'ذ': 'z', 'ر': 'r', 'ڑ': 'r', 'ز': 'z', 'ژ': 'zh',
    'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z',
    'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ک': 'k', 'گ': 'g',
    'ل': 'l', 'م': 'm', 'ن': 'n', 'ں': 'n', 'و': 'o', 'ہ': 'h',
    'ء': 'a', 'ی': 'y', 'ے': 'ay', 'ؤ': 'o',
  }
  
  let romanized = ''
  for (let char of urduRtlText) {
    romanized += transliterationMap[char] || char
  }
  return romanized
}

// Get language-specific greeting based on detected language
export function getLanguageSpecificGreeting(language: DetectedLanguage): string {
  const greetings = {
    'en': 'Hello! How can I help you with your health today?',
    'ur-roman': 'Assalam Alaikum! Aaj aapki kaise madad kar sakta hoon?',
    'ur-rtl': 'السلام علیکم! آج میں آپ کی کیسے مدد کر سکتا ہوں؟'
  }
  return greetings[language] || greetings['en']
}
