import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faChartLine, 
  faArrowTrendUp, 
  faBrain, 
  faBolt, 
  faChartSimple, 
  faArrowRight, 
  faShieldHalved,
  faSliders
} from '@fortawesome/free-solid-svg-icons'

const Main = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <div className="hero-content">
                <div className="eyebrow-badge">
                  <span className="pulse-dot"></span>
                  <span className="eyebrow-text">MACHINE LEARNING &middot; STOCK ANALYTICS</span>
                </div>
                
                <h1 className="hero-headline">
                  Understand Market Trends. <br />
                  <span className="gradient-text">Explore Stock Predictions.</span>
                </h1>
                
                <p className="hero-description">
                  Analyze 10 years of historical stock data, monitor 100-day and 200-day moving averages, 
                  and inspect deep learning LSTM model forecasts benchmarked against empirical regression metrics.
                </p>

                <div className="hero-actions">
                  <Link to="/dashboard" className="btn-primary-glow">
                    <span>Launch Prediction Dashboard</span>
                    <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                  </Link>
                  <a href="#features" className="btn-secondary-dark">
                    <FontAwesomeIcon icon={faSliders} className="me-2 text-cyan" />
                    <span>Explore Features</span>
                  </a>
                </div>

                <div className="hero-trust-pills">
                  <span className="trust-pill">
                    <FontAwesomeIcon icon={faBrain} className="text-cyan me-2" />
                    Keras LSTM Model
                  </span>
                  <span className="trust-pill">
                    <FontAwesomeIcon icon={faArrowTrendUp} className="text-teal me-2" />
                    100 &amp; 200 DMA Analysis
                  </span>
                  <span className="trust-pill">
                    <FontAwesomeIcon icon={faChartSimple} className="text-emerald me-2" />
                    R&sup2; &amp; RMSE Metrics
                  </span>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="hero-visual-card">
                <div className="visual-card-header">
                  <div className="visual-badge">
                    <span className="dot-active"></span>
                    <span>ANALYTICAL PREVIEW</span>
                  </div>
                  <span className="visual-tag">LSTM REGRESSION</span>
                </div>

                {/* Decorative Abstract Financial Chart SVG */}
                <div className="visual-chart-display" aria-hidden="true">
                  <svg viewBox="0 0 400 240" className="hero-svg-chart" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="cyanArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="purpleArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#818CF8" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#818CF8" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Grid lines */}
                    <line x1="0" y1="40" x2="400" y2="40" stroke="rgba(148, 163, 184, 0.08)" strokeDasharray="3 3" />
                    <line x1="0" y1="90" x2="400" y2="90" stroke="rgba(148, 163, 184, 0.08)" strokeDasharray="3 3" />
                    <line x1="0" y1="140" x2="400" y2="140" stroke="rgba(148, 163, 184, 0.08)" strokeDasharray="3 3" />
                    <line x1="0" y1="190" x2="400" y2="190" stroke="rgba(148, 163, 184, 0.08)" strokeDasharray="3 3" />

                    {/* Gradient Fill */}
                    <path
                      d="M 10 180 Q 70 160 120 130 T 220 90 T 310 65 T 390 40 L 390 220 L 10 220 Z"
                      fill="url(#cyanArea)"
                    />

                    {/* 200 DMA curve (Teal/Green) */}
                    <path
                      d="M 10 195 Q 80 180 140 160 T 250 130 T 340 100 T 390 85"
                      fill="none"
                      stroke="#2DD4BF"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />

                    {/* 100 DMA curve (Yellow/Amber) */}
                    <path
                      d="M 10 185 Q 75 165 130 140 T 235 105 T 325 80 T 390 60"
                      fill="none"
                      stroke="#FBBF24"
                      strokeWidth="2"
                    />

                    {/* Closing Price curve (Cyan) */}
                    <path
                      d="M 10 180 Q 70 160 120 130 T 220 90 T 310 65 T 390 40"
                      fill="none"
                      stroke="#22D3EE"
                      strokeWidth="3"
                    />

                    {/* Data Points */}
                    <circle cx="120" cy="130" r="4" fill="#22D3EE" />
                    <circle cx="220" cy="90" r="4" fill="#22D3EE" />
                    <circle cx="310" cy="65" r="4" fill="#22D3EE" />
                    <circle cx="390" cy="40" r="5" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
                  </svg>

                  <div className="chart-legend-row">
                    <span className="legend-item"><span className="legend-indicator bg-cyan"></span> Closing Price</span>
                    <span className="legend-item"><span className="legend-indicator bg-amber"></span> 100 DMA</span>
                    <span className="legend-item"><span className="legend-indicator bg-teal"></span> 200 DMA</span>
                  </div>
                </div>

                <div className="visual-card-footer">
                  <div className="visual-stat">
                    <span className="stat-label">Model Type</span>
                    <span className="stat-value text-cyan">2-Layer LSTM</span>
                  </div>
                  <div className="visual-stat">
                    <span className="stat-label">Historical Window</span>
                    <span className="stat-value">10 Years Data</span>
                  </div>
                  <div className="visual-stat">
                    <span className="stat-label">Lookback Step</span>
                    <span className="stat-value">100 Days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="features-section" id="features">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow">COMPREHENSIVE ANALYTICS SUITE</span>
            <h2 className="section-title">Built for Data-Driven Market Inspection</h2>
            <p className="section-subtitle">
              Every prediction blends quantitative moving average indicators with deep learning regression models.
            </p>
          </div>

          <div className="row g-4 mt-2">
            <div className="col-md-6 col-lg-3">
              <div className="feature-card">
                <div className="feature-icon-wrapper icon-cyan">
                  <FontAwesomeIcon icon={faChartLine} />
                </div>
                <h3 className="feature-card-title">Historical Price Trends</h3>
                <p className="feature-card-text">
                  Retrieves 10-year closing prices via yfinance, charting multi-year price trajectory and market volatility cycles.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="feature-card">
                <div className="feature-icon-wrapper icon-amber">
                  <FontAwesomeIcon icon={faBolt} />
                </div>
                <h3 className="feature-card-title">100-Day Moving Average</h3>
                <p className="feature-card-text">
                  Smooths short-term price noise to highlight intermediate momentum shifts and early trend reversal signals.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="feature-card">
                <div className="feature-icon-wrapper icon-teal">
                  <FontAwesomeIcon icon={faArrowTrendUp} />
                </div>
                <h3 className="feature-card-title">200-Day Moving Average</h3>
                <p className="feature-card-text">
                  Tracks the long-term institutional trend line, widely regarded by market technicians as a major support/resistance indicator.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="feature-card">
                <div className="feature-icon-wrapper icon-emerald">
                  <FontAwesomeIcon icon={faBrain} />
                </div>
                <h3 className="feature-card-title">LSTM Model Evaluation</h3>
                <p className="feature-card-text">
                  Evaluates Keras Sequential LSTM predictions against testing data, reporting empirical MSE, RMSE, and R&sup2; scores.
                </p>
              </div>
            </div>
          </div>

          {/* Educational Disclaimer */}
          <div className="disclaimer-banner mt-5">
            <div className="disclaimer-icon">
              <FontAwesomeIcon icon={faShieldHalved} />
            </div>
            <div className="disclaimer-body">
              <span className="disclaimer-title">Analytical Notice</span>
              <p className="disclaimer-text mb-0">
                For educational and analytical purposes only. Model predictions are experimental machine learning forecasts and do not constitute financial, investment, or trading advice.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Main