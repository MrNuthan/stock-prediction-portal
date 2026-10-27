import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosInstance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faSpinner, 
  faMagnifyingGlass, 
  faChartLine, 
  faArrowTrendUp, 
  faBrain, 
  faCircleExclamation,
  faExpand,
  faXmark,
  faArrowRight,
  faSquarePollVertical
} from '@fortawesome/free-solid-svg-icons'

const QUICK_TICKERS = ['AAPL', 'NVDA', 'TSLA', 'MSFT', 'GOOGL']

const Dashboard = () => {
  const [ticker, setTicker] = useState('')
  const [activeTicker, setActiveTicker] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [plot, setPlot] = useState(null)
  const [ma100, setMA100] = useState(null)
  const [ma200, setMA200] = useState(null)
  const [prediction, setPrediction] = useState(null)
  const [mse, setMSE] = useState(null)
  const [rmse, setRMSE] = useState(null)
  const [r2, setR2] = useState(null)

  // Chart image load error states
  const [imageErrors, setImageErrors] = useState({})

  // Modal enlargement state
  const [modalImage, setModalImage] = useState(null)
  const [modalTitle, setModalTitle] = useState('')

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        await axiosInstance.get('/protected-view/')
      } catch (err) {
        console.error('Authentication verification error:', err)
      }
    }
    fetchProtectedData()
  }, [])

  // Keyboard accessibility for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && modalImage) {
        setModalImage(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [modalImage])

  const formatNumber = (val) => {
    if (val === null || val === undefined) return 'N/A'
    const num = Number(val)
    if (isNaN(num)) return String(val)
    return num.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })
  }

  const handleImageError = (chartKey) => {
    setImageErrors(prev => ({ ...prev, [chartKey]: true }))
  }

  const handleQuickSelect = (symbol) => {
    setTicker(symbol)
  }

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    const cleanTicker = ticker.trim().toUpperCase()
    if (!cleanTicker) {
      setError('Please enter a valid stock ticker symbol.')
      return
    }

    // Reset previous results and errors for a clean prediction run
    setError(null)
    setPlot(null)
    setMA100(null)
    setMA200(null)
    setPrediction(null)
    setMSE(null)
    setRMSE(null)
    setR2(null)
    setImageErrors({})
    setLoading(true)

    try {
      const response = await axiosInstance.post('/predict/', {
        ticker: cleanTicker
      })

      // Backend returns {"error": "...", "status": 404} with HTTP 200 if ticker not found
      if (response.data.error || response.data.status === 404) {
        setError(response.data.error || 'No data found for the specified ticker.')
        return
      }

      const backendRoot = import.meta.env.VITE_BACKEND_ROOT || ''
      // Add a client-side timestamp query to bypass stale browser cache on repeated queries
      const cacheBuster = `?t=${Date.now()}`

      if (response.data.plot_img) {
        setPlot(`${backendRoot}${response.data.plot_img}${cacheBuster}`)
      }
      if (response.data.plot_100_dma) {
        setMA100(`${backendRoot}${response.data.plot_100_dma}${cacheBuster}`)
      }
      if (response.data.plot_200_dma) {
        setMA200(`${backendRoot}${response.data.plot_200_dma}${cacheBuster}`)
      }
      if (response.data.plot_prediction) {
        setPrediction(`${backendRoot}${response.data.plot_prediction}${cacheBuster}`)
      }

      setMSE(response.data.mse)
      setRMSE(response.data.rmse)
      setR2(response.data.r2)
      setActiveTicker(cleanTicker)
    } catch (err) {
      console.error('Prediction request error:', err)
      if (err.response?.data?.error) {
        setError(err.response.data.error)
      } else if (!err.response) {
        setError('Network error. Unable to reach prediction service. Please ensure the backend server is running.')
      } else {
        setError('Failed to generate stock prediction. Please verify the ticker symbol and try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const openModal = (imgUrl, title) => {
    setModalImage(imgUrl)
    setModalTitle(title)
  }

  const closeModal = () => {
    setModalImage(null)
    setModalTitle('')
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        {/* Dashboard Title & Introduction */}
        <div className="dashboard-header mb-4">
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="eyebrow-badge">
              <span className="pulse-dot"></span>
              <span>LSTM-POWERED ANALYSIS</span>
            </span>
            {activeTicker && (
              <span className="ticker-active-pill">
                ACTIVE: {activeTicker}
              </span>
            )}
          </div>
          <h1 className="dashboard-title">Stock Analytics Dashboard</h1>
          <p className="dashboard-subtitle">
            Analyze historical prices, moving averages, and machine learning prediction results.
          </p>
        </div>

        {/* Ticker Search Console Card */}
        <div className="ticker-search-card mb-4">
          <form onSubmit={handleSubmit} noValidate>
            <div className="search-form-row">
              <div className="search-input-wrapper">
                <span className="search-icon">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
                <input
                  type="text"
                  className="ticker-input"
                  id="stock-ticker-input"
                  name="ticker"
                  placeholder="Enter a ticker symbol, e.g. AAPL, NVDA, TSLA..."
                  value={ticker}
                  onChange={(e) => setTicker(e.target.value.toUpperCase())}
                  disabled={loading}
                  autoComplete="off"
                  spellCheck="false"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn-prediction-submit"
                disabled={loading || !ticker.trim()}
              >
                {loading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Run Prediction</span>
                    <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick-Pick Shortcut Chips */}
          <div className="quick-tickers-row mt-3">
            <span className="quick-tickers-label">Popular Tickers:</span>
            <div className="quick-chips-list">
              {QUICK_TICKERS.map((symbol) => (
                <button
                  key={symbol}
                  type="button"
                  className={`quick-chip ${ticker === symbol ? 'chip-active' : ''}`}
                  onClick={() => handleQuickSelect(symbol)}
                  disabled={loading}
                >
                  {symbol}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error Alert Display */}
        {error && (
          <div className="auth-alert auth-alert-danger mb-4" role="alert">
            <FontAwesomeIcon icon={faCircleExclamation} className="alert-icon" />
            <div>
              <strong>Prediction Error:</strong> {error}
            </div>
          </div>
        )}

        {/* Loading State / Skeleton */}
        {loading && (
          <div className="loading-state-wrapper mb-5" aria-live="polite">
            <div className="loading-status-card text-center mb-4">
              <FontAwesomeIcon icon={faSpinner} spin className="loading-spinner text-cyan mb-3" />
              <h3 className="loading-title">Generating Forecast for {ticker}...</h3>
              <p className="loading-subtitle">
                Downloading historical market data, preparing sequence matrices, executing LSTM neural inference, and rendering analytical charts. This typically takes 3 to 6 seconds.
              </p>
            </div>

            {/* Skeleton Metric Cards */}
            <div className="row g-4 mb-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="col-md-4">
                  <div className="metric-card skeleton-pulse">
                    <div className="skeleton-bar w-50 mb-2"></div>
                    <div className="skeleton-bar w-75 mb-3" style={{ height: '2rem' }}></div>
                    <div className="skeleton-bar w-100"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Skeleton Chart Cards */}
            <div className="row g-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="col-lg-6">
                  <div className="chart-card skeleton-pulse">
                    <div className="skeleton-bar w-50 mb-3"></div>
                    <div className="skeleton-image-placeholder"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Prediction Results Display */}
        {prediction && !loading && (
          <div className="prediction-results-wrapper">
            {/* Model Evaluation Metric Cards */}
            <div className="evaluation-section mb-5">
              <div className="section-title-row mb-3">
                <div className="d-flex align-items-center gap-2">
                  <FontAwesomeIcon icon={faSquarePollVertical} className="text-cyan" />
                  <h2 className="section-heading mb-0">Model Evaluation</h2>
                </div>
                <span className="badge-evaluation">REGRESSION BENCHMARKS &middot; {activeTicker}</span>
              </div>

              <div className="row g-4">
                {/* Metric 1: MSE */}
                <div className="col-12 col-md-4">
                  <div className="metric-card">
                    <div className="metric-card-header">
                      <span className="metric-label">Mean Squared Error (MSE)</span>
                      <div className="metric-icon-badge icon-cyan">
                        <FontAwesomeIcon icon={faChartLine} />
                      </div>
                    </div>
                    <div className="metric-value font-mono">
                      {formatNumber(mse)}
                    </div>
                    <p className="metric-description">
                      Average squared difference between LSTM predicted prices and actual prices.
                    </p>
                  </div>
                </div>

                {/* Metric 2: RMSE */}
                <div className="col-12 col-md-4">
                  <div className="metric-card">
                    <div className="metric-card-header">
                      <span className="metric-label">Root Mean Squared Error (RMSE)</span>
                      <div className="metric-icon-badge icon-amber">
                        <FontAwesomeIcon icon={faArrowTrendUp} />
                      </div>
                    </div>
                    <div className="metric-value font-mono">
                      {formatNumber(rmse)}
                    </div>
                    <p className="metric-description">
                      Square root of MSE, measured in original price currency units for direct error scale.
                    </p>
                  </div>
                </div>

                {/* Metric 3: R2 Score */}
                <div className="col-12 col-md-4">
                  <div className="metric-card">
                    <div className="metric-card-header">
                      <span className="metric-label">R-Squared (R&sup2;)</span>
                      <div className="metric-icon-badge icon-teal">
                        <FontAwesomeIcon icon={faBrain} />
                      </div>
                    </div>
                    <div className="metric-value font-mono text-cyan">
                      {formatNumber(r2)}
                    </div>
                    <p className="metric-description">
                      Coefficient of determination; measures variance proportion explained by model predictions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Analytical Charts Grid */}
            <div className="charts-section">
              <div className="section-title-row mb-3">
                <div className="d-flex align-items-center gap-2">
                  <FontAwesomeIcon icon={faChartLine} className="text-cyan" />
                  <h2 className="section-heading mb-0">Market Analysis Charts</h2>
                </div>
                <span className="badge-charts">ORIGINAL MATPLOTLIB FIGURES &middot; {activeTicker}</span>
              </div>

              <div className="row g-4">
                {/* Chart 1: Historical Closing Price */}
                <div className="col-12 col-lg-6">
                  <div className="chart-card">
                    <div className="chart-card-header">
                      <div>
                        <h3 className="chart-title">Historical Closing Price</h3>
                        <p className="chart-subtitle">10-year historical closing price trajectory for {activeTicker}</p>
                      </div>
                      {plot && (
                        <button
                          type="button"
                          className="btn-enlarge-chart"
                          onClick={() => openModal(plot, `Historical Closing Price — ${activeTicker}`)}
                          title="Enlarge Chart"
                          aria-label="Enlarge Historical Closing Price chart"
                        >
                          <FontAwesomeIcon icon={faExpand} />
                        </button>
                      )}
                    </div>

                    <div className="chart-image-container">
                      {imageErrors.plot ? (
                        <div className="chart-error-fallback">
                          <FontAwesomeIcon icon={faCircleExclamation} className="fallback-icon text-amber mb-2" />
                          <p className="fallback-text">Unable to display this chart. Please run the prediction again.</p>
                        </div>
                      ) : (
                        plot && (
                          <img
                            src={plot}
                            alt={`10-year Historical Closing Price Chart for ${activeTicker}`}
                            className="chart-img-fluid"
                            onError={() => handleImageError('plot')}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Chart 2: 100-Day Moving Average */}
                <div className="col-12 col-lg-6">
                  <div className="chart-card">
                    <div className="chart-card-header">
                      <div>
                        <h3 className="chart-title">100-Day Moving Average</h3>
                        <p className="chart-subtitle">Closing price overlayed with intermediate 100 DMA trendline</p>
                      </div>
                      {ma100 && (
                        <button
                          type="button"
                          className="btn-enlarge-chart"
                          onClick={() => openModal(ma100, `100-Day Moving Average — ${activeTicker}`)}
                          title="Enlarge Chart"
                          aria-label="Enlarge 100-Day Moving Average chart"
                        >
                          <FontAwesomeIcon icon={faExpand} />
                        </button>
                      )}
                    </div>

                    <div className="chart-image-container">
                      {imageErrors.ma100 ? (
                        <div className="chart-error-fallback">
                          <FontAwesomeIcon icon={faCircleExclamation} className="fallback-icon text-amber mb-2" />
                          <p className="fallback-text">Unable to display this chart. Please run the prediction again.</p>
                        </div>
                      ) : (
                        ma100 && (
                          <img
                            src={ma100}
                            alt={`100-Day Moving Average Chart for ${activeTicker}`}
                            className="chart-img-fluid"
                            onError={() => handleImageError('ma100')}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Chart 3: 200-Day Moving Average */}
                <div className="col-12 col-lg-6">
                  <div className="chart-card">
                    <div className="chart-card-header">
                      <div>
                        <h3 className="chart-title">200-Day Moving Average</h3>
                        <p className="chart-subtitle">100 DMA and long-term 200 DMA trendlines with closing prices</p>
                      </div>
                      {ma200 && (
                        <button
                          type="button"
                          className="btn-enlarge-chart"
                          onClick={() => openModal(ma200, `200-Day Moving Average — ${activeTicker}`)}
                          title="Enlarge Chart"
                          aria-label="Enlarge 200-Day Moving Average chart"
                        >
                          <FontAwesomeIcon icon={faExpand} />
                        </button>
                      )}
                    </div>

                    <div className="chart-image-container">
                      {imageErrors.ma200 ? (
                        <div className="chart-error-fallback">
                          <FontAwesomeIcon icon={faCircleExclamation} className="fallback-icon text-amber mb-2" />
                          <p className="fallback-text">Unable to display this chart. Please run the prediction again.</p>
                        </div>
                      ) : (
                        ma200 && (
                          <img
                            src={ma200}
                            alt={`200-Day Moving Average Chart for ${activeTicker}`}
                            className="chart-img-fluid"
                            onError={() => handleImageError('ma200')}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Chart 4: Actual vs Predicted Prices */}
                <div className="col-12 col-lg-6">
                  <div className="chart-card chart-card-featured">
                    <div className="chart-card-header">
                      <div>
                        <div className="d-flex align-items-center gap-2">
                          <h3 className="chart-title">Actual vs Predicted Prices</h3>
                          <span className="badge-model">LSTM FORECAST</span>
                        </div>
                        <p className="chart-subtitle">Testing dataset actual prices compared against LSTM model inference</p>
                      </div>
                      {prediction && (
                        <button
                          type="button"
                          className="btn-enlarge-chart"
                          onClick={() => openModal(prediction, `Final Prediction vs Actual — ${activeTicker}`)}
                          title="Enlarge Chart"
                          aria-label="Enlarge Final Prediction chart"
                        >
                          <FontAwesomeIcon icon={faExpand} />
                        </button>
                      )}
                    </div>

                    <div className="chart-image-container">
                      {imageErrors.prediction ? (
                        <div className="chart-error-fallback">
                          <FontAwesomeIcon icon={faCircleExclamation} className="fallback-icon text-amber mb-2" />
                          <p className="fallback-text">Unable to display this chart. Please run the prediction again.</p>
                        </div>
                      ) : (
                        prediction && (
                          <img
                            src={prediction}
                            alt={`LSTM Predicted vs Actual Prices Chart for ${activeTicker}`}
                            className="chart-img-fluid"
                            onError={() => handleImageError('prediction')}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Accessible Chart Viewer Modal */}
      {modalImage && (
        <div 
          className="chart-modal-backdrop" 
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={modalTitle}
        >
          <div className="chart-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="chart-modal-header">
              <h4 className="chart-modal-title">{modalTitle}</h4>
              <button 
                type="button" 
                className="btn-modal-close" 
                onClick={closeModal}
                aria-label="Close chart dialog"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <div className="chart-modal-body">
              <img 
                src={modalImage} 
                alt={modalTitle} 
                className="modal-chart-image"
              />
            </div>
            <div className="chart-modal-footer">
              <span className="modal-caption">
                Backend generated static Matplotlib figure &middot; Aspect ratio ~12:5
              </span>
              <button type="button" className="btn-secondary-dark" onClick={closeModal}>
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard