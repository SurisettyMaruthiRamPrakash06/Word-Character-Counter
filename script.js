/**
 * Enhanced Word and Character Counter
 *
 * This script provides real-time word and character counting functionality
 * with additional features like reading time estimation, dark mode,
 * text cleaning, and downloading text as a file.
 */

// DOM elements
const textInput = document.getElementById("text-input")
const wordCount = document.getElementById("word-count")
const characterCount = document.getElementById("character-count")
const sentenceCount = document.getElementById("sentence-count")
const paragraphCount = document.getElementById("paragraph-count")
const readingTime = document.getElementById("reading-time")
const clearButton = document.getElementById("clear-button")
const cleanButton = document.getElementById("clean-button")
const downloadButton = document.getElementById("download-button")
const themeToggle = document.getElementById("theme-toggle")
const htmlElement = document.documentElement

// Chart setup
let statsChart
const chartData = {
  labels: [],
  words: [],
  characters: [],
}

/**
 * Counts words in a text string, ignoring extra spaces
 * @param {string} text - The text to count words in
 * @returns {number} - The number of words
 */
function countWords(text) {
  // Trim the text to remove leading/trailing whitespace
  const trimmedText = text.trim()

  // If text is empty after trimming, return 0
  if (trimmedText === "") {
    return 0
  }

  // Split by whitespace and filter out empty strings
  // This handles multiple spaces, tabs, and newlines
  const words = trimmedText.split(/\s+/).filter((word) => word !== "")
  return words.length
}

/**
 * Counts characters in a text string
 * @param {string} text - The text to count characters in
 * @returns {number} - The number of characters
 */
function countCharacters(text) {
  return text.length
}

/**
 * Counts sentences in a text string
 * @param {string} text - The text to count sentences in
 * @returns {number} - The number of sentences
 */
function countSentences(text) {
  if (!text.trim()) return 0

  // Count sequences ending with ., !, or ? as sentences
  const sentences = text.split(/[.!?]+/).filter((sentence) => sentence.trim().length > 0)
  return sentences.length
}

/**
 * Counts paragraphs in a text string
 * @param {string} text - The text to count paragraphs in
 * @returns {number} - The number of paragraphs
 */
function countParagraphs(text) {
  if (!text.trim()) return 0

  // Count double newlines as paragraph separators
  const paragraphs = text.split(/\n\s*\n/).filter((paragraph) => paragraph.trim().length > 0)
  return paragraphs.length
}

/**
 * Calculates estimated reading time in minutes
 * @param {number} wordCount - Number of words in the text
 * @returns {number} - Estimated reading time in minutes
 */
function calculateReadingTime(wordCount) {
  // Average reading speed: 200 words per minute
  const wordsPerMinute = 200
  const minutes = wordCount / wordsPerMinute

  // Return at least 1 minute for any text with words
  return wordCount > 0 ? Math.max(1, Math.round(minutes)) : 0
}

/**
 * Cleans text by removing extra spaces and trimming
 * @param {string} text - The text to clean
 * @returns {string} - The cleaned text
 */
function cleanText(text) {
  // Replace multiple spaces with a single space
  let cleanedText = text.replace(/\s+/g, " ")

  // Replace multiple newlines with a maximum of two (for paragraph separation)
  cleanedText = cleanedText.replace(/\n{3,}/g, "\n\n")

  // Trim leading/trailing whitespace
  return cleanedText.trim()
}

/**
 * Updates the word and character counts in the UI
 */
function updateCounts() {
  const text = textInput.value

  // Update word count
  const words = countWords(text)
  wordCount.textContent = words

  // Update character count
  const characters = countCharacters(text)
  characterCount.textContent = characters

  // Update sentence count
  const sentences = countSentences(text)
  sentenceCount.textContent = sentences

  // Update paragraph count
  const paragraphs = countParagraphs(text)
  paragraphCount.textContent = paragraphs

  // Update reading time
  const time = calculateReadingTime(words)
  readingTime.textContent = time

  // Update ARIA attributes for accessibility
  textInput.setAttribute(
    "aria-label",
    `Text input with ${words} words, ${characters} characters, ${sentences} sentences, and ${paragraphs} paragraphs. Estimated reading time: ${time} minutes.`,
  )

  // Update chart data
  updateChart(words, characters)
}

/**
 * Clears the textarea and resets the counters
 */
function clearText() {
  textInput.value = ""
  updateCounts()
  resetChart()

  // Focus on the textarea after clearing for better UX
  textInput.focus()
}

/**
 * Cleans the text in the textarea
 */
function handleCleanText() {
  const originalText = textInput.value
  if (!originalText.trim()) return

  const cleaned = cleanText(originalText)
  textInput.value = cleaned
  updateCounts()

  // Focus on the textarea after cleaning
  textInput.focus()
}

/**
 * Downloads the current text as a .txt file
 */
function downloadText() {
  const text = textInput.value
  if (!text.trim()) {
    alert("Please enter some text before downloading.")
    return
  }

  // Create a Blob with the text content
  const blob = new Blob([text], { type: "text/plain" })

  // Create a temporary anchor element
  const a = document.createElement("a")
  a.href = URL.createObjectURL(blob)

  // Set the filename with date for uniqueness
  const date = new Date().toISOString().slice(0, 10)
  a.download = `text_${date}.txt`

  // Trigger the download
  document.body.appendChild(a)
  a.click()

  // Clean up
  document.body.removeChild(a)
  URL.revokeObjectURL(a.href)
}

/**
 * Toggles between light and dark themes
 */
function toggleTheme() {
  const currentTheme = htmlElement.getAttribute("data-theme")
  const newTheme = currentTheme === "light" ? "dark" : "light"

  htmlElement.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)

  // Update chart colors if chart exists
  if (statsChart) {
    updateChartTheme(newTheme)
  }
}

/**
 * Updates chart colors based on theme
 * @param {string} theme - The current theme (light or dark)
 */
function updateChartTheme(theme) {
  const textColor = theme === "dark" ? "#b0b0b0" : "#666"
  const gridColor = theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"

  statsChart.options.scales.x.grid.color = gridColor
  statsChart.options.scales.x.ticks.color = textColor
  statsChart.options.scales.y.grid.color = gridColor
  statsChart.options.scales.y.ticks.color = textColor

  statsChart.update()
}

/**
 * Initializes the chart for tracking word and character counts
 */
function initChart() {
  const ctx = document.getElementById("stats-chart").getContext("2d")
  const theme = htmlElement.getAttribute("data-theme")
  const textColor = theme === "dark" ? "#b0b0b0" : "#666"
  const gridColor = theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"

  statsChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "Words",
          data: [],
          borderColor: "#6a11cb",
          backgroundColor: "rgba(106, 17, 203, 0.1)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Characters",
          data: [],
          borderColor: "#f5576c",
          backgroundColor: "rgba(245, 87, 108, 0.1)",
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 500,
      },
      scales: {
        x: {
          grid: {
            color: gridColor,
          },
          ticks: {
            color: textColor,
            maxTicksLimit: 5,
          },
          title: {
            display: true,
            text: "Time",
            color: textColor,
          },
        },
        y: {
          grid: {
            color: gridColor,
          },
          ticks: {
            color: textColor,
          },
          title: {
            display: true,
            text: "Count",
            color: textColor,
          },
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
    },
  })
}

/**
 * Updates the chart with new data points
 * @param {number} words - Current word count
 * @param {number} characters - Current character count
 */
function updateChart(words, characters) {
  // Only update chart every few seconds to avoid performance issues
  const now = new Date()
  const timeLabel = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })

  // Limit data points to keep chart readable
  if (statsChart.data.labels.length > 10) {
    statsChart.data.labels.shift()
    statsChart.data.datasets[0].data.shift()
    statsChart.data.datasets[1].data.shift()
  }

  statsChart.data.labels.push(timeLabel)
  statsChart.data.datasets[0].data.push(words)
  statsChart.data.datasets[1].data.push(characters)

  statsChart.update()
}

/**
 * Resets the chart data
 */
function resetChart() {
  statsChart.data.labels = []
  statsChart.data.datasets[0].data = []
  statsChart.data.datasets[1].data = []
  statsChart.update()
}

/**
 * Initializes the application
 */
function initApp() {
  // Set theme from localStorage or default to light
  const savedTheme = localStorage.getItem("theme") || "light"
  htmlElement.setAttribute("data-theme", savedTheme)

  // Initialize the chart
  initChart()

  // Update counts on page load
  updateCounts()

  // Set up event listeners
  textInput.addEventListener("input", updateCounts)
  clearButton.addEventListener("click", clearText)
  cleanButton.addEventListener("click", handleCleanText)
  downloadButton.addEventListener("click", downloadText)
  themeToggle.addEventListener("click", toggleTheme)

  // Add keyboard shortcuts
  document.addEventListener("keydown", (event) => {
    // Ctrl+Delete for clearing
    if (event.ctrlKey && event.key === "Delete") {
      clearText()
      event.preventDefault()
    }

    // Ctrl+D for downloading
    if (event.ctrlKey && event.key === "d") {
      downloadText()
      event.preventDefault()
    }

    // Ctrl+L for cleaning
    if (event.ctrlKey && event.key === "l") {
      handleCleanText()
      event.preventDefault()
    }
  })
}

// Initialize the app when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initApp)
