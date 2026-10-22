import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def create_deck(output_path):
    prs = Presentation()
    # Set 16:9 widescreen dimensions
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]  # completely blank

    # Color Palette (Tailwind-inspired tech deck)
    NAVY = RGBColor(15, 23, 42)        # Slate 900
    DARK_BLUE = RGBColor(30, 41, 59)   # Slate 800
    ACCENT_BLUE = RGBColor(37, 99, 235)# Blue 600
    CYAN = RGBColor(14, 165, 233)      # Sky 500
    EMERALD = RGBColor(16, 185, 129)   # Emerald 500
    AMBER = RGBColor(245, 158, 11)     # Amber 500
    RED = RGBColor(239, 68, 68)        # Red 500
    WHITE = RGBColor(255, 255, 255)
    LIGHT_BG = RGBColor(248, 250, 252) # Slate 50
    CARD_BG = RGBColor(255, 255, 255)
    CARD_BORDER = RGBColor(226, 232, 240)
    TEXT_MUTED = RGBColor(100, 116, 139)
    TEXT_DARK = RGBColor(30, 41, 59)

    def add_header(slide, tag_text, title_text, subtitle_text):
        # Header banner tag
        tag_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.5), Inches(8), Inches(0.4))
        tf = tag_box.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = tag_text.upper()
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = ACCENT_BLUE

        # Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.85), Inches(11.7), Inches(0.6))
        tf = title_box.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title_text
        p.font.size = Pt(24)
        p.font.bold = True
        p.font.color.rgb = NAVY

        # Subtitle
        sub_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.45), Inches(11.7), Inches(0.45))
        tf = sub_box.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = subtitle_text
        p.font.size = Pt(12)
        p.font.color.rgb = TEXT_MUTED

    # -------------------------------------------------------------
    # SLIDE 1: Title Slide (Dark Theme)
    # -------------------------------------------------------------
    slide1 = prs.slides.add_slide(blank_layout)
    bg1 = slide1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
    bg1.fill.solid()
    bg1.fill.fore_color.rgb = NAVY
    bg1.line.color.rgb = NAVY

    # Decorative banner box
    decor = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(3.2), Inches(0.38))
    decor.fill.solid()
    decor.fill.fore_color.rgb = DARK_BLUE
    decor.line.color.rgb = ACCENT_BLUE
    dtf = decor.text_frame
    dp = dtf.paragraphs[0]
    dp.text = "HYBRID AI + QUANTUM INNOVATION"
    dp.font.size = Pt(10)
    dp.font.bold = True
    dp.font.color.rgb = CYAN
    dp.alignment = PP_ALIGN.CENTER

    # Main Title
    tbox = slide1.shapes.add_textbox(Inches(0.8), Inches(2.35), Inches(11.5), Inches(1.5))
    ttf = tbox.text_frame
    ttf.word_wrap = True
    tp = ttf.paragraphs[0]
    tp.text = "CROWDSHIELD"
    tp.font.size = Pt(54)
    tp.font.bold = True
    tp.font.color.rgb = WHITE

    # Subtitle
    sbox = slide1.shapes.add_textbox(Inches(0.8), Inches(3.85), Inches(11.5), Inches(0.9))
    stf = sbox.text_frame
    stf.word_wrap = True
    sp = stf.paragraphs[0]
    sp.text = "Predictive Crowd Density & Stampede Prevention via Quantum Reservoir Computing & YOLOv11 Computer Vision"
    sp.font.size = Pt(18)
    sp.font.color.rgb = RGBColor(148, 163, 184)

    # 3 Stat Badges at bottom
    stats = [
        ("Surveillance Vision", "YOLOv11 Anonymous Detection"),
        ("Predictive Engine", "5-Qubit Quantum Reservoir (QRC)"),
        ("Live Cadence", "3-Second Adaptive Decision Loop")
    ]
    for i, (k, v) in enumerate(stats):
        bx = Inches(0.8 + i * 3.85)
        card = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, bx, Inches(5.1), Inches(3.6), Inches(1.3))
        card.fill.solid()
        card.fill.fore_color.rgb = DARK_BLUE
        card.line.color.rgb = RGBColor(51, 65, 85)
        ctf = card.text_frame
        ctf.word_wrap = True
        cp1 = ctf.paragraphs[0]
        cp1.text = k.upper()
        cp1.font.size = Pt(10)
        cp1.font.bold = True
        cp1.font.color.rgb = CYAN
        cp2 = ctf.add_paragraph()
        cp2.text = v
        cp2.font.size = Pt(13)
        cp2.font.bold = True
        cp2.font.color.rgb = WHITE

    slide1.notes_slide.notes_text_frame.text = (
        "JUDGE PITCH SCRIPT:\n"
        "'Good morning judges. We don't just detect the crowd that exists now — we predict the crowd that is coming next. "
        "Welcome to CrowdShield: a real-time, privacy-first surveillance intelligence platform powered by YOLO computer vision "
        "and Quantum Reservoir Computing to stop crowd disasters before they happen.'"
    )

    # -------------------------------------------------------------
    # SLIDE 2: The Critical Problem & Gap
    # -------------------------------------------------------------
    slide2 = prs.slides.add_slide(blank_layout)
    add_header(slide2, "Problem Statement & Urgency", "The Lethal Lag in Modern Crowd Management",
               "Every year, stampedes and crowd crushes claim hundreds of lives at festivals, transit hubs, and religious gatherings.")

    cards_data = [
        ("The Current Reality: Fatal Latency",
         [("Purely Reactive Cameras: ", "Current CCTV simply records disasters after people begin falling."),
          ("Human Operator Fatigue: ", "Security teams cannot reliably spot non-linear density spikes across 50+ screens."),
          ("Tragic Repercussions: ", "Seoul Halloween (159 dead), Astroworld (10 dead), Maha Kumbh Mela historical surges.")]),
        ("The Technical Bottleneck",
         [("Small Data Scarcity: ", "Catastrophic surges occur rarely; deep neural nets (LSTMs, Transformers) overfit without massive historical training data."),
          ("Non-Linear Sudden Phase Transitions: ", "Crowd dynamics transition from fluid to turbulent in seconds, defeating linear extrapolation."),
          ("Latency & Compute: ", "Heavy cloud AI models introduce roundtrip delay incompatible with emergency response.")])
    ]

    for idx, (title, points) in enumerate(cards_data):
        cx = Inches(0.8 + idx * 5.9)
        c = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, cx, Inches(2.1), Inches(5.7), Inches(4.7))
        c.fill.solid()
        c.fill.fore_color.rgb = LIGHT_BG
        c.line.color.rgb = CARD_BORDER
        tf = c.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(15)
        p.font.bold = True
        p.font.color.rgb = NAVY
        p.space_after = Pt(12)

        for bold_prefix, text in points:
            p_item = tf.add_paragraph()
            p_item.font.size = Pt(12)
            p_item.space_after = Pt(10)
            run_b = p_item.add_run()
            run_b.text = "• " + bold_prefix
            run_b.font.bold = True
            run_b.font.color.rgb = ACCENT_BLUE if idx == 0 else RED
            run_t = p_item.add_run()
            run_t.text = text
            run_t.font.color.rgb = TEXT_DARK

    slide2.notes_slide.notes_text_frame.text = (
        "JUDGE PITCH SCRIPT:\n"
        "'When human crowds cross 4 to 6 people per square meter, fluid shockwaves travel through the crowd, making it impossible to breathe. "
        "The problem today is NOT a lack of cameras. It is that existing systems are 100% reactive. "
        "Standard deep learning models fail here because crowd surge events are rare and non-linear. "
        "That is where quantum-inspired physics creates an entirely new paradigm.'"
    )

    # -------------------------------------------------------------
    # SLIDE 3: The CrowdShield Paradigm
    # -------------------------------------------------------------
    slide3 = prs.slides.add_slide(blank_layout)
    add_header(slide3, "System Overview & Mission", "Predictive Prevention: Moving from Reaction to Pre-emption",
               "CrowdShield introduces a closed-loop intelligence architecture that converts camera streams into automated crowd containment.")

    cols = [
        ("01. Anonymous Perception", "YOLOv11 Vision Layer", 
         "Samples video frames every 30 frames (1s) to count pedestrians anonymously via bounding boxes. Zero facial recognition. Total privacy compliance.",
         CYAN),
        ("02. Quantum Reservoir", "5-Qubit QRC Prediction", 
         "Maps 5-step temporal sequences onto a high-dimensional quantum Hilbert space using Qiskit quantum circuit entanglement dynamics.",
         ACCENT_BLUE),
        ("03. Automated Intervention", "Intelligent Risk Engine", 
         "Compares predicted occupancy against zone capacity to dispatch concrete preventive actions (SAFE / WARNING / HIGH / CRITICAL).",
         EMERALD)
    ]

    for idx, (step, title, desc, color) in enumerate(cols):
        cx = Inches(0.8 + idx * 3.9)
        c = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, cx, Inches(2.1), Inches(3.7), Inches(4.7))
        c.fill.solid()
        c.fill.fore_color.rgb = LIGHT_BG
        c.line.color.rgb = CARD_BORDER
        tf = c.text_frame
        tf.word_wrap = True
        
        p0 = tf.paragraphs[0]
        p0.text = step
        p0.font.size = Pt(11)
        p0.font.bold = True
        p0.font.color.rgb = color
        p0.space_after = Pt(6)

        p1 = tf.add_paragraph()
        p1.text = title
        p1.font.size = Pt(16)
        p1.font.bold = True
        p1.font.color.rgb = NAVY
        p1.space_after = Pt(14)

        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(12)
        p2.font.color.rgb = TEXT_DARK
        p2.space_after = Pt(14)

        p3 = tf.add_paragraph()
        p3.text = "Key Advantage:"
        p3.font.size = Pt(11)
        p3.font.bold = True
        p3.font.color.rgb = NAVY

        p4 = tf.add_paragraph()
        if idx == 0:
            p4.text = "Operates on commodity CCTV feeds; GDPR / HIPAA compliant by design."
        elif idx == 1:
            p4.text = "Learns intricate non-linear momentum with only 38 training sequences."
        else:
            p4.text = "Gives venue commanders 60-180 seconds of vital pre-incident lead time."
        p4.font.size = Pt(11)
        p4.font.color.rgb = TEXT_MUTED

    slide3.notes_slide.notes_text_frame.text = (
        "JUDGE PITCH SCRIPT:\n"
        "'Here is our 3-step paradigm: First, anonymous computer vision extracts pedestrian head/torso counts. "
        "Second, our 5-qubit quantum reservoir predicts the crowd count for the upcoming interval. "
        "Third, our automated risk engine alerts venue managers with specific operational interventions — like redirecting gates or throttling turnstiles — "
        "before density reaches a dangerous threshold.'"
    )

    # -------------------------------------------------------------
    # SLIDE 4: Computer Vision Input Layer
    # -------------------------------------------------------------
    slide4 = prs.slides.add_slide(blank_layout)
    add_header(slide4, "Computer Vision Input Layer", "YOLOv11: High-Speed, Anonymous Pedestrian Counting",
               "Capturing ground-truth crowd flow in real-time without compromising individual citizen privacy.")

    cards_cv = [
        ("YOLOv11 Architecture & Detection",
         [("Model Backbone: ", "State-of-the-art YOLOv11 nano model running lightweight inference."),
          ("Anonymous Class Filtering: ", "Filters strictly on class_id == 0 (person). Ignores baggage, vehicles, and environmental clutter."),
          ("Frame-Rate Sampling: ", "Samples every 30 frames (~1.0s real time) to build robust temporal time-series without overloading the processor."),
          ("Privacy Preservation: ", "No facial recognition, no biometric storage, no identity tracking. Zero privacy liability.")]),
        ("Temporal Time-Series Framing",
         [("Sliding Window Construction: ", "Formulates continuous time series as 5-reading temporal vectors: [x(t-4), x(t-3), x(t-2), x(t-1), x(t)]."),
          ("Dynamic Normalization: ", "MinMaxScaler scales pedestrian counts into the [0, 1] range for quantum gate parameter encoding."),
          ("Dual Video Pipeline: ", "Validated on live surveillance video feeds (vdo.mp4 with 43 intervals, and f2.mp4 high-density sequences)."),
          ("Adaptive Fallback: ", "Resilient path resolution & smart pre-computed detection caching ensure sub-second response times.")])
    ]

    for idx, (title, points) in enumerate(cards_cv):
        cx = Inches(0.8 + idx * 5.9)
        c = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, cx, Inches(2.1), Inches(5.7), Inches(4.7))
        c.fill.solid()
        c.fill.fore_color.rgb = LIGHT_BG
        c.line.color.rgb = CARD_BORDER
        tf = c.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(15)
        p.font.bold = True
        p.font.color.rgb = NAVY
        p.space_after = Pt(12)

        for bold_prefix, text in points:
            p_item = tf.add_paragraph()
            p_item.font.size = Pt(12)
            p_item.space_after = Pt(9)
            run_b = p_item.add_run()
            run_b.text = "• " + bold_prefix
            run_b.font.bold = True
            run_b.font.color.rgb = ACCENT_BLUE
            run_t = p_item.add_run()
            run_t.text = text
            run_t.font.color.rgb = TEXT_DARK

    slide4.notes_slide.notes_text_frame.text = (
        "JUDGE PITCH SCRIPT:\n"
        "'Our visual input layer is built on YOLOv11. It detects people anonymously by isolating pedestrian bounding boxes. "
        "We never capture faces, biometric records, or identifiable data, which makes CrowdShield immediately deployable in public spaces. "
        "Every 3 seconds, the detection count is fed into a 5-step sliding window to form our time-series input vector.'"
    )

    # -------------------------------------------------------------
    # SLIDE 5: Quantum Reservoir Computing (QRC) Core
    # -------------------------------------------------------------
    slide5 = prs.slides.add_slide(blank_layout)
    add_header(slide5, "The Quantum Core Innovation", "Why Quantum Reservoir Computing (QRC)?",
               "Leveraging quantum Hilbert space expansion for non-linear time-series forecasting on small datasets.")

    q_cards = [
        ("The Reservoir Computing Philosophy",
         [("Untrained Non-Linear Core: ", "Unlike classical RNNs that require backpropagation through time (BPTT), a reservoir features fixed, complex non-linear dynamics."),
          ("Only Train the Readout: ", "Only the linear output weights (Ridge Regression) are trained, eliminating exploding/vanishing gradients."),
          ("Rapid Convergence: ", "Trains in seconds with minimal compute overhead — perfect for edge and embedded deployment.")]),
        ("The 5-Qubit Quantum Advantage",
         [("Hilbert Space Expansion: ", "5 qubits yield a 2^5 = 32-dimensional complex quantum state space, capturing high-order non-linear correlations."),
          ("Rotational State Encoding: ", "Each scalar count x_i is mapped to qubit rotation: theta_i = pi * norm(x_i) via RY rotation gates."),
          ("Entanglement Dynamics: ", "Nearest-neighbor CNOT gates create quantum entanglement between consecutive time steps, mimicking natural crowd inertia."),
          ("Expectation Value Readout: ", "Pauli-Z expectation values <Z_i> in [-1, +1] provide rich non-linear projection features for Ridge readout.")])
    ]

    for idx, (title, points) in enumerate(q_cards):
        cx = Inches(0.8 + idx * 5.9)
        c = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, cx, Inches(2.1), Inches(5.7), Inches(4.7))
        c.fill.solid()
        c.fill.fore_color.rgb = LIGHT_BG
        c.line.color.rgb = CARD_BORDER
        tf = c.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(15)
        p.font.bold = True
        p.font.color.rgb = NAVY
        p.space_after = Pt(12)

        for bold_prefix, text in points:
            p_item = tf.add_paragraph()
            p_item.font.size = Pt(12)
            p_item.space_after = Pt(9)
            run_b = p_item.add_run()
            run_b.text = "• " + bold_prefix
            run_b.font.bold = True
            run_b.font.color.rgb = CYAN if idx == 1 else ACCENT_BLUE
            run_t = p_item.add_run()
            run_t.text = text
            run_t.font.color.rgb = TEXT_DARK

    slide5.notes_slide.notes_text_frame.text = (
        "JUDGE PITCH SCRIPT:\n"
        "'This is our biggest technical breakthrough. In classical reservoir computing, you use physical materials or large recurrent networks. "
        "In our system, we use a 5-qubit quantum reservoir in Qiskit. "
        "We encode the 5 normalized crowd readings into rotation angles on 5 qubits, apply entangling CNOT gates, and measure Pauli-Z expectation values. "
        "This projects small 5-number inputs into a rich 32-dimensional quantum Hilbert space, allowing simple Ridge regression to predict sudden non-linear spikes.'"
    )

    # -------------------------------------------------------------
    # SLIDE 6: End-to-End System Architecture
    # -------------------------------------------------------------
    slide6 = prs.slides.add_slide(blank_layout)
    add_header(slide6, "System Architecture & Data Flow", "Full-Stack Hybrid Classical-Quantum Pipeline",
               "Synchronized integration from CCTV surveillance input to reactive Command Center UI.")

    flow_boxes = [
        ("SURVEILLANCE FEED", "RTSP / CCTV / Video Streams\n(vdo.mp4 & f2.mp4)", DARK_BLUE),
        ("YOLOv11 VISION", "Anonymous Person Counting\nSampled every 30 frames", ACCENT_BLUE),
        ("TIME SERIES BUFFER", "5-Point Temporal Window\n[x(t-4) ... x(t)]", DARK_BLUE),
        ("QISKIT QUANTUM CORE", "5-Qubit RY + CNOT Reservoir\n<Z_i> Pauli-Z Expectation", CYAN),
        ("RIDGE REGRESSION", "Calibrated Output Readout\nPredicted Next Crowd Count", ACCENT_BLUE),
        ("RISK ENGINE & UI", "Automated Action Dispatch\nReact Command Dashboard", EMERALD)
    ]

    for i, (b_title, b_desc, b_col) in enumerate(flow_boxes):
        row = i // 3
        col = i % 3
        bx = Inches(0.8 + col * 3.9)
        by = Inches(2.1 + row * 2.4)

        b = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, bx, by, Inches(3.7), Inches(2.1))
        b.fill.solid()
        b.fill.fore_color.rgb = LIGHT_BG
        b.line.color.rgb = b_col
        b.line.width = Pt(2)
        tf = b.text_frame
        tf.word_wrap = True

        p0 = tf.paragraphs[0]
        p0.text = f"PHASE 0{i+1}"
        p0.font.size = Pt(10)
        p0.font.bold = True
        p0.font.color.rgb = b_col

        p1 = tf.add_paragraph()
        p1.text = b_title
        p1.font.size = Pt(14)
        p1.font.bold = True
        p1.font.color.rgb = NAVY
        p1.space_after = Pt(6)

        p2 = tf.add_paragraph()
        p2.text = b_desc
        p2.font.size = Pt(11)
        p2.font.color.rgb = TEXT_DARK

    slide6.notes_slide.notes_text_frame.text = (
        "JUDGE PITCH SCRIPT:\n"
        "'Judges, notice the clean separation of concerns in our architecture: "
        "YOLO operates on frames to produce discrete counts. "
        "FastAPI normalizes the 5-step window and invokes Qiskit. "
        "Qiskit maps the quantum states and measures Z expectations. "
        "Ridge regression predicts the crowd, and our automated risk engine streams recommendations to the React dashboard over an active 3-second cycle.'"
    )

    # -------------------------------------------------------------
    # SLIDE 7: Automated Risk Engine & Preventive Actions
    # -------------------------------------------------------------
    slide7 = prs.slides.add_slide(blank_layout)
    add_header(slide7, "Operational Risk Decision Engine", "Automated Crowd Containment Protocols",
               "Translating raw crowd predictions into immediate, deterministic safety protocols.")

    levels = [
        ("SAFE (< 60% Capacity)", "Normal Monitoring",
         "Crowd flow is fluid. Standard ambient surveillance. Green status indicator across command console.",
         EMERALD),
        ("WARNING (60% - 79% Capacity)", "Pre-emptive Staging",
         "Occupancy escalating. Alert ground supervisors, prepare crowd-management marshals, and illuminate advisory signs.",
         AMBER),
        ("HIGH (80% - 100% Capacity)", "Active Inflow Control",
         "Impending bottleneck. Throttle ingress turnstiles, deploy extra staff to chokepoints, and open secondary bypass corridors.",
         RGBColor(249, 115, 22)),
        ("CRITICAL (> 100% Capacity)", "Emergency Divert & Lockdown",
         "Severe crush risk. Restrict all entry gates immediately, execute one-way egress routing, broadcast audio alarms, and notify civic first responders.",
         RED)
    ]

    for idx, (lvl, action, detail, col) in enumerate(levels):
        by = Inches(2.1 + idx * 1.18)
        row_shape = slide7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), by, Inches(11.7), Inches(1.05))
        row_shape.fill.solid()
        row_shape.fill.fore_color.rgb = LIGHT_BG
        row_shape.line.color.rgb = col
        row_shape.line.width = Pt(1.5)

        tf = row_shape.text_frame
        tf.word_wrap = True
        
        p = tf.paragraphs[0]
        run_tag = p.add_run()
        run_tag.text = lvl + "   ➔   "
        run_tag.font.bold = True
        run_tag.font.size = Pt(13)
        run_tag.font.color.rgb = col

        run_act = p.add_run()
        run_act.text = action + "\n"
        run_act.font.bold = True
        run_act.font.size = Pt(13)
        run_act.font.color.rgb = NAVY

        p_sub = tf.add_paragraph()
        p_sub.text = detail
        p_sub.font.size = Pt(11)
        p_sub.font.color.rgb = TEXT_DARK

    slide7.notes_slide.notes_text_frame.text = (
        "JUDGE PITCH SCRIPT:\n"
        "'A prediction is useless without actionable response. Our risk engine implements a 4-tier safety protocol: "
        "At Safe, normal monitoring. At Warning, we pre-stage security. "
        "At High, we throttle turnstiles and activate alternate corridors. "
        "At Critical, we restrict entry gates, redirect crowd vectors, and trigger emergency audio protocols. "
        "This provides event security teams with minutes of reaction time, not seconds.'"
    )

    # -------------------------------------------------------------
    # SLIDE 8: Experimental Validation & Benchmarks
    # -------------------------------------------------------------
    slide8 = prs.slides.add_slide(blank_layout)
    add_header(slide8, "Empirical Validation & Results", "Real-World Experimental Benchmarking",
               "Tested on real-world multi-pedestrian video sequences with measurable predictive accuracy.")

    benchmarks = [
        ("1.61 People", "Mean Absolute Error (MAE)", "Demonstrated on 38 experimental CCTV training sequences. Accurately anticipates sudden flow changes.", CYAN),
        ("42 ms", "End-to-End Latency", "Sub-50ms hybrid quantum simulation and inference turnaround time on standard consumer hardware.", ACCENT_BLUE),
        ("3.0 sec", "Live Sampling Cadence", "Continuous rolling window updates ensure high temporal responsiveness without screen jitter.", EMERALD),
        ("Zero", "Biometric Storage", "Full privacy compliance by processing strictly anonymous bounding boxes with no facial tracking.", NAVY)
    ]

    for idx, (stat, title, subtext, col) in enumerate(benchmarks):
        bx = Inches(0.8 + idx * 2.95)
        c = slide8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, bx, Inches(2.1), Inches(2.8), Inches(2.3))
        c.fill.solid()
        c.fill.fore_color.rgb = LIGHT_BG
        c.line.color.rgb = CARD_BORDER
        tf = c.text_frame
        tf.word_wrap = True

        p0 = tf.paragraphs[0]
        p0.text = stat
        p0.font.size = Pt(28)
        p0.font.bold = True
        p0.font.color.rgb = col
        p0.alignment = PP_ALIGN.CENTER
        p0.space_after = Pt(4)

        p1 = tf.add_paragraph()
        p1.text = title
        p1.font.size = Pt(12)
        p1.font.bold = True
        p1.font.color.rgb = NAVY
        p1.alignment = PP_ALIGN.CENTER
        p1.space_after = Pt(6)

        p2 = tf.add_paragraph()
        p2.text = subtext
        p2.font.size = Pt(10)
        p2.font.color.rgb = TEXT_MUTED
        p2.alignment = PP_ALIGN.CENTER

    # Honest Competitor / Scientific Note Box
    callout = slide8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(4.7), Inches(11.7), Inches(2.1))
    callout.fill.solid()
    callout.fill.fore_color.rgb = RGBColor(238, 242, 255) # Indigo 50
    callout.line.color.rgb = RGBColor(199, 210, 254)
    ctf = callout.text_frame
    ctf.word_wrap = True

    cp0 = ctf.paragraphs[0]
    cp0.text = "JUDGE CREDIBILITY NOTE: HONEST SCIENTIFIC RIGOR"
    cp0.font.size = Pt(11)
    cp0.font.bold = True
    cp0.font.color.rgb = ACCENT_BLUE
    cp0.space_after = Pt(4)

    cp1 = ctf.add_paragraph()
    cp1.text = (
        "Rather than making unrealistic claims of '99% precision', we ground our prototype in validated metrics: "
        "Our QRC achieved an MAE of ~1.61 people across small temporal datasets where traditional deep networks overfit. "
        "This proves the viability of quantum reservoir computing for small-sample high-entropy time-series problems, "
        "serving as an ideal candidate for scale-up to municipal CCTV networks."
    )
    cp1.font.size = Pt(11)
    cp1.font.color.rgb = TEXT_DARK

    slide8.notes_slide.notes_text_frame.text = (
        "JUDGE PITCH SCRIPT:\n"
        "'A huge point for judges: we present honest, scientifically validated metrics. "
        "On our experimental surveillance sequences, our QRC achieved a Mean Absolute Error of 1.61 people. "
        "Where complex neural networks overfit due to small emergency sample sizes, our 5-qubit quantum reservoir generalizes effortlessly. "
        "The entire pipeline executes in under 45 milliseconds on commodity hardware.'"
    )

    # -------------------------------------------------------------
    # SLIDE 9: Command Center Dashboard & Live UX
    # -------------------------------------------------------------
    slide9 = prs.slides.add_slide(blank_layout)
    add_header(slide9, "Interactive Command Center", "Modern React & Vite Command Center Interface",
               "Designed for high-stress security operations centers with intuitive visual clarity.")

    ui_features = [
        ("Multi-Feed Video Switcher", "Seamless toggle between recorded surveillance CCTV (vdo.mp4), high-density stress test (f2.mp4), live webcam, or file uploads.", CYAN),
        ("Live 3-Second Temporal Pulse", "Autonomous sampling heartbeat advancing the 5-reading temporal window in real time with zero UI freezing or render drops.", ACCENT_BLUE),
        ("Multi-Scale Operation Modes", "Dual operational scale: Demo Scale (Capacity 12 for camera prototype) and Venue Scale (Capacity 20,000 for stadiums/arenas).", EMERALD),
        ("Multi-Zone Safety Grid", "Monitors 4 discrete ingress/egress zones simultaneously with localized quantum forecasts and historical risk trends.", AMBER)
    ]

    for idx, (title, desc, col) in enumerate(ui_features):
        row = idx // 2
        col_idx = idx % 2
        bx = Inches(0.8 + col_idx * 5.9)
        by = Inches(2.1 + row * 2.35)

        box = slide9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, bx, by, Inches(5.7), Inches(2.1))
        box.fill.solid()
        box.fill.fore_color.rgb = LIGHT_BG
        box.line.color.rgb = CARD_BORDER
        tf = box.text_frame
        tf.word_wrap = True

        p0 = tf.paragraphs[0]
        p0.text = title
        p0.font.size = Pt(15)
        p0.font.bold = True
        p0.font.color.rgb = NAVY
        p0.space_after = Pt(8)

        p1 = tf.add_paragraph()
        p1.text = desc
        p1.font.size = Pt(12)
        p1.font.color.rgb = TEXT_DARK

    slide9.notes_slide.notes_text_frame.text = (
        "JUDGE PITCH SCRIPT:\n"
        "'The UI is engineered for real command centers. It features instant switching between CCTV cameras, "
        "an active 3-second live sampling loop, dual operational scaling for testing and full stadium deployment, "
        "and a multi-zone safety grid. The command staff doesn't need to understand quantum physics — they get clear numbers and immediate actions.'"
    )

    # -------------------------------------------------------------
    # SLIDE 10: Conclusion & Competitive Edge (Dark Theme)
    # -------------------------------------------------------------
    slide10 = prs.slides.add_slide(blank_layout)
    bg10 = slide10.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
    bg10.fill.solid()
    bg10.fill.fore_color.rgb = NAVY
    bg10.line.color.rgb = NAVY

    # Header
    tag_box10 = slide10.shapes.add_textbox(Inches(0.8), Inches(0.5), Inches(8), Inches(0.4))
    tf10 = tag_box10.text_frame
    p10 = tf10.paragraphs[0]
    p10.text = "THE COMPETITIVE ADVANTAGE".upper()
    p10.font.size = Pt(10)
    p10.font.bold = True
    p10.font.color.rgb = CYAN

    title_box10 = slide10.shapes.add_textbox(Inches(0.8), Inches(0.85), Inches(11.7), Inches(0.6))
    tf10_t = title_box10.text_frame
    p10_t = tf10_t.paragraphs[0]
    p10_t.text = "Why CrowdShield Wins"
    p10_t.font.size = Pt(26)
    p10_t.font.bold = True
    p10_t.font.color.rgb = WHITE

    win_cards = [
        ("Proactive vs Reactive", "Stops crushes minutes before density crosses fatal thresholds, unlike legacy retrospective CCTV recorders.", CYAN),
        ("Quantum Sample Efficiency", "Outperforms deep neural networks on sparse, small-sample surge datasets using 5-qubit Hilbert space dynamics.", ACCENT_BLUE),
        ("Privacy-Compliant Scale", "Anonymous bounding-box telemetry guarantees total GDPR and municipal regulatory acceptance.", EMERALD),
        ("Commercial Readiness", "Lightweight enough to execute on edge devices, stadiums, metro stations, and pilgrimage hubs today.", AMBER)
    ]

    for idx, (title, desc, col) in enumerate(win_cards):
        cx = Inches(0.8 + idx * 2.95)
        c = slide10.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, cx, Inches(1.8), Inches(2.8), Inches(3.6))
        c.fill.solid()
        c.fill.fore_color.rgb = DARK_BLUE
        c.line.color.rgb = col
        c.line.width = Pt(1.5)
        tf = c.text_frame
        tf.word_wrap = True

        p0 = tf.paragraphs[0]
        p0.text = f"PILLAR 0{idx+1}"
        p0.font.size = Pt(10)
        p0.font.bold = True
        p0.font.color.rgb = col
        p0.space_after = Pt(8)

        p1 = tf.add_paragraph()
        p1.text = title
        p1.font.size = Pt(15)
        p1.font.bold = True
        p1.font.color.rgb = WHITE
        p1.space_after = Pt(12)

        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(11)
        p2.font.color.rgb = RGBColor(203, 213, 225)

    # Closing Punchline Banner
    banner = slide10.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(5.7), Inches(11.7), Inches(1.2))
    banner.fill.solid()
    banner.fill.fore_color.rgb = DARK_BLUE
    banner.line.color.rgb = CYAN
    btf = banner.text_frame
    btf.word_wrap = True

    bp0 = btf.paragraphs[0]
    bp0.text = "“We don’t just detect the crowd that exists now. We predict the crowd that is coming next.”"
    bp0.font.size = Pt(18)
    bp0.font.bold = True
    bp0.font.color.rgb = WHITE
    bp0.alignment = PP_ALIGN.CENTER

    bp1 = btf.add_paragraph()
    bp1.text = "CrowdShield: Pioneering Quantum-Assisted Public Safety."
    bp1.font.size = Pt(12)
    bp1.font.color.rgb = CYAN
    bp1.alignment = PP_ALIGN.CENTER

    slide10.notes_slide.notes_text_frame.text = (
        "JUDGE PITCH SCRIPT:\n"
        "'In conclusion judges: CrowdShield bridges cutting-edge quantum computing theory with critical humanitarian application. "
        "It is fast, it is privacy-first, and most importantly, it gives humanity the power to anticipate disasters before they claim innocent lives. "
        "Remember: We don't just detect the crowd that exists now. We predict the crowd that is coming next. "
        "Thank you, and we welcome your questions!'"
    )

    prs.save(output_path)
    print(f"Presentation saved successfully to {output_path}")

if __name__ == "__main__":
    out = os.path.abspath(r"C:\Users\HP\OneDrive - Nalanda Educational Institutions\Desktop\crowd\CrowdShield_Presentation.pptx")
    create_deck(out)
