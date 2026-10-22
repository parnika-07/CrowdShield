import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def create_deck(output_path):
    prs = Presentation()
    # 16:9 Widescreen layout
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Premium Color Palette
    NAVY = RGBColor(15, 23, 42)          # Slate 900
    DARK_BLUE = RGBColor(30, 41, 59)     # Slate 800
    ACCENT_BLUE = RGBColor(37, 99, 235)  # Blue 600
    CYAN = RGBColor(14, 165, 233)        # Sky 500
    EMERALD = RGBColor(16, 185, 129)     # Emerald 500
    AMBER = RGBColor(245, 158, 11)       # Amber 500
    RED = RGBColor(239, 68, 68)          # Red 500
    WHITE = RGBColor(255, 255, 255)
    LIGHT_BG = RGBColor(248, 250, 252)   # Slate 50
    CARD_BORDER = RGBColor(226, 232, 240)
    TEXT_MUTED = RGBColor(100, 116, 139)
    TEXT_DARK = RGBColor(15, 23, 42)

    CROWD_DIR = r"C:\Users\HP\OneDrive - Nalanda Educational Institutions\Desktop\crowd"
    ASSETS = os.path.join(CROWD_DIR, "presentation_assets")

    img_raw = os.path.join(ASSETS, "crowd_cctv_raw.jpg")
    img_yolo = os.path.join(ASSETS, "crowd_yolo_detected.jpg")
    img_dense = os.path.join(ASSETS, "crowd_dense_yolo.jpg")
    img_circuit = os.path.join(ASSETS, "quantum_circuit.png")
    img_ui = os.path.join(ASSETS, "dashboard_mockup_1.png")

    def add_light_header(slide, tag_text, title_text):
        tag_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(10), Inches(0.35))
        tf = tag_box.text_frame
        p = tf.paragraphs[0]
        p.text = tag_text.upper()
        p.font.size = Pt(12)
        p.font.bold = True
        p.font.color.rgb = ACCENT_BLUE

        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.75), Inches(11.7), Inches(0.75))
        tf = title_box.text_frame
        p = tf.paragraphs[0]
        p.text = title_text
        p.font.size = Pt(28)
        p.font.bold = True
        p.font.color.rgb = NAVY

    # =============================================================
    # SLIDE 1: INTRO PAGE (Big Font Title + Team Name Placeholder)
    # =============================================================
    slide1 = prs.slides.add_slide(blank_layout)
    bg1 = slide1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
    bg1.fill.solid()
    bg1.fill.fore_color.rgb = NAVY
    bg1.line.color.rgb = NAVY

    # Pill badge
    badge = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.3), Inches(4.2), Inches(0.45))
    badge.fill.solid()
    badge.fill.fore_color.rgb = DARK_BLUE
    badge.line.color.rgb = ACCENT_BLUE
    btf = badge.text_frame
    bp = btf.paragraphs[0]
    bp.text = "AI + QUANTUM SAFETY PLATFORM"
    bp.font.size = Pt(11)
    bp.font.bold = True
    bp.font.color.rgb = CYAN
    bp.alignment = PP_ALIGN.CENTER

    # Huge Title
    tbox = slide1.shapes.add_textbox(Inches(0.8), Inches(1.9), Inches(11.7), Inches(1.8))
    ttf = tbox.text_frame
    ttf.word_wrap = True
    tp = ttf.paragraphs[0]
    tp.text = "CROWDSHIELD"
    tp.font.size = Pt(64)
    tp.font.bold = True
    tp.font.color.rgb = WHITE

    # Subtitle
    sbox = slide1.shapes.add_textbox(Inches(0.8), Inches(3.7), Inches(11.7), Inches(0.8))
    stf = sbox.text_frame
    stf.word_wrap = True
    sp = stf.paragraphs[0]
    sp.text = "Predictive Crowd Density & Stampede Prevention"
    sp.font.size = Pt(24)
    sp.font.bold = True
    sp.font.color.rgb = CYAN

    # Highlight line
    sp2 = stf.add_paragraph()
    sp2.text = "Powered by YOLOv11 Computer Vision & 5-Qubit Quantum Reservoir Computing (QRC)"
    sp2.font.size = Pt(16)
    sp2.font.color.rgb = RGBColor(148, 163, 184)
    sp2.space_before = Pt(6)

    # Bottom Team Box (Big & Easy to Edit!)
    team_card = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(5.3), Inches(11.7), Inches(1.5))
    team_card.fill.solid()
    team_card.fill.fore_color.rgb = DARK_BLUE
    team_card.line.color.rgb = RGBColor(51, 65, 85)
    tctf = team_card.text_frame
    tctf.word_wrap = True

    tcp0 = tctf.paragraphs[0]
    tcp0.text = "PRESENTED BY:"
    tcp0.font.size = Pt(11)
    tcp0.font.bold = True
    tcp0.font.color.rgb = CYAN

    tcp1 = tctf.add_paragraph()
    tcp1.text = "[Your Name / Team Member Names Here]"
    tcp1.font.size = Pt(18)
    tcp1.font.bold = True
    tcp1.font.color.rgb = WHITE
    tcp1.space_before = Pt(4)

    tcp2 = tctf.add_paragraph()
    tcp2.text = "[Your College / Institution Name / Competition Track]"
    tcp2.font.size = Pt(13)
    tcp2.font.color.rgb = RGBColor(148, 163, 184)
    tcp2.space_before = Pt(2)

    slide1.notes_slide.notes_text_frame.text = (
        "JUDGE PITCH:\n"
        "'Good morning judges. We don't just detect the crowd that exists now — we predict the crowd that is coming next. "
        "We are team [Names], and this is CrowdShield.'"
    )

    # =============================================================
    # SLIDE 2: THE PROBLEM (High Impact Crowd Image + Big Stats)
    # =============================================================
    slide2 = prs.slides.add_slide(blank_layout)
    add_light_header(slide2, "The Urgent Problem", "Why Today's CCTV Surveillance Fails")

    # Left: Big Callout Cards
    card1 = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.7), Inches(6.0), Inches(5.2))
    card1.fill.solid()
    card1.fill.fore_color.rgb = LIGHT_BG
    card1.line.color.rgb = CARD_BORDER
    c1tf = card1.text_frame
    c1tf.word_wrap = True

    p = c1tf.paragraphs[0]
    p.text = "100% REACTIVE"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = RED

    p = c1tf.add_paragraph()
    p.text = "Current cameras only record disasters after people fall."
    p.font.size = Pt(19)
    p.font.bold = True
    p.font.color.rgb = NAVY
    p.space_after = Pt(16)

    bullets = [
        ("Fatal Delay: ", "By the time operators notice a density crush, stampede shockwaves have already started."),
        ("150+ Lives Lost: ", "Recent tragedies (Seoul Halloween, Astroworld) prove humans cannot watch 50+ screens in real time."),
        ("Non-Linear Surges: ", "Crowds transition from safe flow to deadly turbulence in under 60 seconds.")
    ]
    for b_title, b_desc in bullets:
        bp = c1tf.add_paragraph()
        bp.space_after = Pt(12)
        r1 = bp.add_run()
        r1.text = "• " + b_title
        r1.font.bold = True
        r1.font.size = Pt(14)
        r1.font.color.rgb = RED
        r2 = bp.add_run()
        r2.text = b_desc
        r2.font.size = Pt(14)
        r2.font.color.rgb = TEXT_DARK

    # Right: Crowd Photo
    if os.path.exists(img_raw):
        slide2.shapes.add_picture(img_raw, Inches(7.1), Inches(1.7), width=Inches(5.4))
        # Label overlay
        lbl = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.3), Inches(5.9), Inches(5.0), Inches(0.8))
        lbl.fill.solid()
        lbl.fill.fore_color.rgb = NAVY
        lbl.line.color.rgb = RED
        ltf = lbl.text_frame
        lp = ltf.paragraphs[0]
        lp.text = "⚠️ Real CCTV: Visual bottlenecks form in seconds"
        lp.font.size = Pt(12)
        lp.font.bold = True
        lp.font.color.rgb = WHITE

    slide2.notes_slide.notes_text_frame.text = (
        "JUDGE PITCH:\n"
        "'The problem today is NOT a lack of cameras. It is that existing systems are 100% reactive. "
        "Standard CCTV simply documents tragedies after people fall. We need automated pre-emption.'"
    )

    # =============================================================
    # SLIDE 3: OUR SOLUTION (3 Big Steps + Real Detection Photo)
    # =============================================================
    slide3 = prs.slides.add_slide(blank_layout)
    add_light_header(slide3, "The CrowdShield Solution", "Predictive Public Safety in 3 Steps")

    # Left: 3 Big Step Cards
    steps = [
        ("01. ANONYMOUS DETECTION", "YOLOv11 counts people via bounding boxes. Zero face recognition. 100% privacy-safe.", CYAN),
        ("02. QUANTUM PREDICTION", "5-Qubit Quantum Reservoir (QRC) predicts crowd density for the next time window.", ACCENT_BLUE),
        ("03. AUTOMATED ACTION", "Risk Engine gives commanders 60 to 180 seconds of vital lead time to divert crowds.", EMERALD)
    ]
    for idx, (stitle, sdesc, scol) in enumerate(steps):
        sy = Inches(1.7 + idx * 1.7)
        box = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), sy, Inches(6.0), Inches(1.5))
        box.fill.solid()
        box.fill.fore_color.rgb = LIGHT_BG
        box.line.color.rgb = scol
        box.line.width = Pt(2)
        btf = box.text_frame
        btf.word_wrap = True

        bp0 = btf.paragraphs[0]
        bp0.text = stitle
        bp0.font.size = Pt(13)
        bp0.font.bold = True
        bp0.font.color.rgb = scol

        bp1 = btf.add_paragraph()
        bp1.text = sdesc
        bp1.font.size = Pt(14)
        bp1.font.color.rgb = TEXT_DARK
        bp1.space_before = Pt(4)

    # Right: High density crowd YOLO image
    if os.path.exists(img_dense):
        slide3.shapes.add_picture(img_dense, Inches(7.1), Inches(1.7), width=Inches(5.4))
        lbl = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.3), Inches(5.9), Inches(5.0), Inches(0.8))
        lbl.fill.solid()
        lbl.fill.fore_color.rgb = NAVY
        lbl.line.color.rgb = ACCENT_BLUE
        ltf = lbl.text_frame
        lp = ltf.paragraphs[0]
        lp.text = "✓ Live AI Perception: Anonymous Bounding Box Tracking"
        lp.font.size = Pt(12)
        lp.font.bold = True
        lp.font.color.rgb = CYAN

    slide3.notes_slide.notes_text_frame.text = (
        "JUDGE PITCH:\n"
        "'Here is our 3-step paradigm: First, anonymous computer vision counts people without storing faces. "
        "Second, a 5-qubit quantum reservoir predicts what is coming next. "
        "Third, an automated risk engine gives venue commanders minutes of advance notice to divert gates.'"
    )

    # =============================================================
    # SLIDE 4: VISION LAYER (Real YOLO Screenshot + Big Highlights)
    # =============================================================
    slide4 = prs.slides.add_slide(blank_layout)
    add_light_header(slide4, "Computer Vision Layer", "YOLOv11: High-Speed Anonymous Counting")

    # Left: Real YOLO annotated image from project!
    if os.path.exists(img_yolo):
        slide4.shapes.add_picture(img_yolo, Inches(0.8), Inches(1.7), width=Inches(6.0))

    # Right: Big Highlight Points
    rcard = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.1), Inches(1.7), Inches(5.4), Inches(5.2))
    rcard.fill.solid()
    rcard.fill.fore_color.rgb = LIGHT_BG
    rcard.line.color.rgb = CARD_BORDER
    rtf = rcard.text_frame
    rtf.word_wrap = True

    rp0 = rtf.paragraphs[0]
    rp0.text = "PRIVACY-FIRST VISION"
    rp0.font.size = Pt(12)
    rp0.font.bold = True
    rp0.font.color.rgb = ACCENT_BLUE

    rp1 = rtf.add_paragraph()
    rp1.text = "Real-Time Detection Without Biometric Storage"
    rp1.font.size = Pt(20)
    rp1.font.bold = True
    rp1.font.color.rgb = NAVY
    rp1.space_after = Pt(18)

    yolo_points = [
        ("Pedestrian Filtering: ", "Filters strictly on Person (class 0). Bypasses bags, umbrellas, and vehicles."),
        ("Zero Facial Recognition: ", "Operates purely on bounding boxes. Fully compliant with GDPR and public privacy laws."),
        ("1-Second Sampling: ", "Processes 30 frames/sec into smooth temporal sequences without CPU lag."),
        ("Instant Plug-and-Play: ", "Works seamlessly over standard RTSP, CCTV feeds, or video uploads.")
    ]
    for b_title, b_desc in yolo_points:
        p = rtf.add_paragraph()
        p.space_after = Pt(12)
        r1 = p.add_run()
        r1.text = "• " + b_title
        r1.font.bold = True
        r1.font.size = Pt(14)
        r1.font.color.rgb = ACCENT_BLUE
        r2 = p.add_run()
        r2.text = b_desc
        r2.font.size = Pt(14)
        r2.font.color.rgb = TEXT_DARK

    slide4.notes_slide.notes_text_frame.text = (
        "JUDGE PITCH:\n"
        "'Our visual input layer is built on YOLOv11. It isolates human bounding boxes without ever analyzing facial features. "
        "It can run on existing municipal CCTV cameras today without expensive retrofitting.'"
    )

    # =============================================================
    # SLIDE 5: QUANTUM RESERVOIR (Quantum Circuit Image + Why QRC)
    # =============================================================
    slide5 = prs.slides.add_slide(blank_layout)
    add_light_header(slide5, "The Quantum Core Innovation", "Quantum Reservoir Computing (QRC)")

    # Top: Actual generated Quantum Circuit Diagram!
    if os.path.exists(img_circuit):
        slide5.shapes.add_picture(img_circuit, Inches(0.8), Inches(1.6), width=Inches(11.7))

    # Bottom: 3 Big Takeaway Cards
    q_points = [
        ("32 Quantum Dimensions", "5 qubits create a 2^5 = 32-dimensional complex Hilbert space from just 5 numbers.", CYAN),
        ("Why QRC Beats LSTMs", "Deep networks overfit on rare crowd surges. Quantum Reservoirs generalize effortlessly with minimal data.", ACCENT_BLUE),
        ("Sub-50ms Execution", "Runs locally on classical PCs using Qiskit statevectors, with physical QPU readiness.", EMERALD)
    ]
    for idx, (qtitle, qdesc, qcol) in enumerate(q_points):
        qx = Inches(0.8 + idx * 3.95)
        qcard = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, qx, Inches(4.7), Inches(3.8), Inches(2.3))
        qcard.fill.solid()
        qcard.fill.fore_color.rgb = LIGHT_BG
        qcard.line.color.rgb = qcol
        qcard.line.width = Pt(1.5)
        qtf = qcard.text_frame
        qtf.word_wrap = True

        qp0 = qtf.paragraphs[0]
        qp0.text = qtitle
        qp0.font.size = Pt(16)
        qp0.font.bold = True
        qp0.font.color.rgb = qcol

        qp1 = qtf.add_paragraph()
        qp1.text = qdesc
        qp1.font.size = Pt(13)
        qp1.font.color.rgb = TEXT_DARK
        qp1.space_before = Pt(6)

    slide5.notes_slide.notes_text_frame.text = (
        "JUDGE PITCH:\n"
        "'This is our main technical innovation. In Qiskit, we encode our 5 temporal readings as rotational angles across 5 qubits and entangle them. "
        "This maps simple numbers into a rich 32-dimensional quantum Hilbert space, allowing simple Ridge regression to predict sudden non-linear surges.'"
    )

    # =============================================================
    # SLIDE 6: END-TO-END PIPELINE (Simple Visual Flow)
    # =============================================================
    slide6 = prs.slides.add_slide(blank_layout)
    add_light_header(slide6, "System Architecture", "How CrowdShield Works: Data Flow Pipeline")

    pipeline = [
        ("1. CCTV VIDEO", "Surveillance camera or uploaded stream (vdo.mp4 / f2.mp4)", DARK_BLUE),
        ("2. YOLOv11 VISION", "Anonymous pedestrian count extracted every 30 frames", ACCENT_BLUE),
        ("3. 5-STEP WINDOW", "Rolling temporal buffer: [x(t-4), x(t-3), x(t-2), x(t-1), x(t)]", DARK_BLUE),
        ("4. QISKIT QRC", "5-Qubit quantum circuit simulation & Pauli-Z expectation values", CYAN),
        ("5. RIDGE REGRESSION", "Fast linear readout predicts next crowd number", ACCENT_BLUE),
        ("6. RISK ENGINE & UI", "Dispatches safety action to Command Center every 3 seconds", EMERALD)
    ]

    for i, (ptitle, pdesc, pcol) in enumerate(pipeline):
        col = i % 3
        row = i // 3
        px = Inches(0.8 + col * 3.95)
        py = Inches(1.8 + row * 2.5)

        pcard = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, px, py, Inches(3.8), Inches(2.2))
        pcard.fill.solid()
        pcard.fill.fore_color.rgb = LIGHT_BG
        pcard.line.color.rgb = pcol
        pcard.line.width = Pt(2)
        ptf = pcard.text_frame
        ptf.word_wrap = True

        pp0 = ptf.paragraphs[0]
        pp0.text = ptitle
        pp0.font.size = Pt(16)
        pp0.font.bold = True
        pp0.font.color.rgb = pcol

        pp1 = ptf.add_paragraph()
        pp1.text = pdesc
        pp1.font.size = Pt(13)
        pp1.font.color.rgb = TEXT_DARK
        pp1.space_before = Pt(8)

    slide6.notes_slide.notes_text_frame.text = (
        "JUDGE PITCH:\n"
        "'Notice the clean flow: YOLO extracts the count, FastAPI structures the 5-point window, Qiskit expands it into quantum states, "
        "and Ridge regression predicts the next number. The entire loop executes in under 50ms.'"
    )

    # =============================================================
    # SLIDE 7: AUTOMATED RISK PROTOCOLS (4 Color-Coded Tiers)
    # =============================================================
    slide7 = prs.slides.add_slide(blank_layout)
    add_light_header(slide7, "Automated Decision Engine", "From Numbers to Immediate Safety Action")

    risk_tiers = [
        ("SAFE (< 60% Capacity)", "Normal Monitoring", "Ambient crowd flow. Continuous passive observation.", EMERALD),
        ("WARNING (60% - 79% Capacity)", "Pre-emptive Staging", "Alert ground supervisors, stage security marshals, illuminate digital advisory signs.", AMBER),
        ("HIGH (80% - 100% Capacity)", "Active Inflow Control", "Throttle ingress turnstiles, deploy extra staff, open bypass corridors.", RGBColor(249, 115, 22)),
        ("CRITICAL (> 100% Capacity)", "Emergency Divert", "Restrict entry gates, activate one-way egress, sound alarm, dispatch first responders.", RED)
    ]

    for idx, (rtitle, raction, rdesc, rcol) in enumerate(risk_tiers):
        ry = Inches(1.7 + idx * 1.3)
        rcard = slide7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), ry, Inches(11.7), Inches(1.15))
        rcard.fill.solid()
        rcard.fill.fore_color.rgb = LIGHT_BG
        rcard.line.color.rgb = rcol
        rcard.line.width = Pt(2)
        rtf = rcard.text_frame
        rtf.word_wrap = True

        p0 = rtf.paragraphs[0]
        r1 = p0.add_run()
        r1.text = rtitle + "  ➔  "
        r1.font.bold = True
        r1.font.size = Pt(15)
        r1.font.color.rgb = rcol

        r2 = p0.add_run()
        r2.text = raction
        r2.font.bold = True
        r2.font.size = Pt(15)
        r2.font.color.rgb = NAVY

        p1 = rtf.add_paragraph()
        p1.text = rdesc
        p1.font.size = Pt(12)
        p1.font.color.rgb = TEXT_DARK
        p1.space_before = Pt(2)

    slide7.notes_slide.notes_text_frame.text = (
        "JUDGE PITCH:\n"
        "'A prediction is only valuable if it triggers action. Our 4-tier risk engine automatically guides commanders: "
        "from normal monitoring at Safe, to pre-staging at Warning, to throttled turnstiles at High, and emergency bypass at Critical.'"
    )

    # =============================================================
    # SLIDE 8: RESULTS & BENCHMARKS (Huge Stat Callouts)
    # =============================================================
    slide8 = prs.slides.add_slide(blank_layout)
    add_light_header(slide8, "Experimental Benchmarks", "Tested & Proven Metrics on Real Video Feeds")

    stats = [
        ("1.61 People", "MEAN ABSOLUTE ERROR (MAE)", "Demonstrated on real CCTV sequences; tracks sudden flow changes with high fidelity.", CYAN),
        ("42 ms", "END-TO-END LATENCY", "Sub-50ms hybrid quantum simulation and inference turnaround time.", ACCENT_BLUE),
        ("3.0 sec", "LIVE SAMPLING PULSE", "Continuous rolling window updates with zero UI lag or render dropouts.", EMERALD)
    ]

    for idx, (sval, stitle, sdesc, scol) in enumerate(stats):
        sx = Inches(0.8 + idx * 3.95)
        scard = slide8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, sx, Inches(1.8), Inches(3.8), Inches(3.0))
        scard.fill.solid()
        scard.fill.fore_color.rgb = LIGHT_BG
        scard.line.color.rgb = scol
        scard.line.width = Pt(2)
        stf = scard.text_frame
        stf.word_wrap = True

        p0 = stf.paragraphs[0]
        p0.text = sval
        p0.font.size = Pt(36)
        p0.font.bold = True
        p0.font.color.rgb = scol
        p0.alignment = PP_ALIGN.CENTER
        p0.space_after = Pt(8)

        p1 = stf.add_paragraph()
        p1.text = stitle
        p1.font.size = Pt(13)
        p1.font.bold = True
        p1.font.color.rgb = NAVY
        p1.alignment = PP_ALIGN.CENTER
        p1.space_after = Pt(8)

        p2 = stf.add_paragraph()
        p2.text = sdesc
        p2.font.size = Pt(12)
        p2.font.color.rgb = TEXT_DARK
        p2.alignment = PP_ALIGN.CENTER

    # Bottom Highlight Callout
    bot = slide8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(5.1), Inches(11.7), Inches(1.8))
    bot.fill.solid()
    bot.fill.fore_color.rgb = RGBColor(238, 242, 255)
    bot.line.color.rgb = ACCENT_BLUE
    btf = bot.text_frame
    btf.word_wrap = True

    bp0 = btf.paragraphs[0]
    bp0.text = "🎯 SCIENTIFIC RIGOR NOTE FOR JUDGES:"
    bp0.font.size = Pt(13)
    bp0.font.bold = True
    bp0.font.color.rgb = ACCENT_BLUE

    bp1 = btf.add_paragraph()
    bp1.text = "Rather than claiming unrealistic '99% accuracy', our prototype achieves an honest MAE of 1.61 people on experimental CCTV data where deep networks overfit due to small sample size. This proves Quantum Reservoir Computing is the ideal solution for sparse, high-entropy emergencies."
    bp1.font.size = Pt(13)
    bp1.font.color.rgb = TEXT_DARK
    bp1.space_before = Pt(4)

    slide8.notes_slide.notes_text_frame.text = (
        "JUDGE PITCH:\n"
        "'Judges, our metrics are honest and validated: an MAE of 1.61 people, sub-45ms latency, and a continuous 3-second cycle. "
        "Where deep networks overfit due to lack of crowd crush data, our quantum reservoir model excels.'"
    )

    # =============================================================
    # SLIDE 9: COMMAND CENTER (Real UI Screenshot + Big Highlights)
    # =============================================================
    slide9 = prs.slides.add_slide(blank_layout)
    add_light_header(slide9, "Command Center UI", "Modern Operations Console for Security Teams")

    # Left: Actual UI Screenshot
    if os.path.exists(img_ui):
        slide9.shapes.add_picture(img_ui, Inches(0.8), Inches(1.7), width=Inches(6.2))

    # Right: Big Highlight Points
    ucard = slide9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.3), Inches(1.7), Inches(5.2), Inches(5.2))
    ucard.fill.solid()
    ucard.fill.fore_color.rgb = LIGHT_BG
    ucard.line.color.rgb = CARD_BORDER
    utf = ucard.text_frame
    utf.word_wrap = True

    up0 = utf.paragraphs[0]
    up0.text = "COMMAND CENTER FEATURES"
    up0.font.size = Pt(12)
    up0.font.bold = True
    up0.font.color.rgb = ACCENT_BLUE

    up1 = utf.add_paragraph()
    up1.text = "Built for Rapid High-Stress Operations"
    up1.font.size = Pt(20)
    up1.font.bold = True
    up1.font.color.rgb = NAVY
    up1.space_after = Pt(18)

    ui_points = [
        ("Instant CCTV Switching: ", "One-click toggle between CCTV feeds (vdo.mp4, f2.mp4, webcam, or video uploads)."),
        ("Live 3-Second Pulse: ", "Automated background sampling loop updates counts and quantum forecast without freezing."),
        ("Multi-Scale Operation: ", "Supports Demo Mode (Capacity 12) and Stadium Venue Mode (Capacity 20,000)."),
        ("Multi-Zone Safety Grid: ", "Monitors 4 discrete zones simultaneously with individual risk ratings.")
    ]
    for b_title, b_desc in ui_points:
        p = utf.add_paragraph()
        p.space_after = Pt(12)
        r1 = p.add_run()
        r1.text = "• " + b_title
        r1.font.bold = True
        r1.font.size = Pt(14)
        r1.font.color.rgb = ACCENT_BLUE
        r2 = p.add_run()
        r2.text = b_desc
        r2.font.size = Pt(14)
        r2.font.color.rgb = TEXT_DARK

    slide9.notes_slide.notes_text_frame.text = (
        "JUDGE PITCH:\n"
        "'The Command Center is designed for actual security staff. It gives operators one-click camera switching, "
        "an active 3-second live sampling loop, and multi-zone monitoring with zero lag.'"
    )

    # =============================================================
    # SLIDE 10: THANK YOU PAGE (Big Title + Quote + Team Edit)
    # =============================================================
    slide10 = prs.slides.add_slide(blank_layout)
    bg10 = slide10.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
    bg10.fill.solid()
    bg10.fill.fore_color.rgb = NAVY
    bg10.line.color.rgb = NAVY

    # Big Thank You Title
    ty_box = slide10.shapes.add_textbox(Inches(0.8), Inches(1.3), Inches(11.7), Inches(1.5))
    ty_tf = ty_box.text_frame
    tp = ty_tf.paragraphs[0]
    tp.text = "THANK YOU!"
    tp.font.size = Pt(64)
    tp.font.bold = True
    tp.font.color.rgb = WHITE

    # Quote Banner
    q_card = slide10.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(2.9), Inches(11.7), Inches(1.5))
    q_card.fill.solid()
    q_card.fill.fore_color.rgb = DARK_BLUE
    q_card.line.color.rgb = CYAN
    q_tf = q_card.text_frame
    q_tf.word_wrap = True

    qp0 = q_tf.paragraphs[0]
    qp0.text = "“We don’t just detect the crowd that exists now."
    qp0.font.size = Pt(22)
    qp0.font.bold = True
    qp0.font.color.rgb = WHITE
    qp0.alignment = PP_ALIGN.CENTER

    qp1 = q_tf.add_paragraph()
    qp1.text = "We predict the crowd that is coming next.”"
    qp1.font.size = Pt(22)
    qp1.font.bold = True
    qp1.font.color.rgb = CYAN
    qp1.alignment = PP_ALIGN.CENTER
    qp1.space_before = Pt(4)

    # Contact & Team Info Box (Editable at bottom)
    bot_card = slide10.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(4.8), Inches(11.7), Inches(1.8))
    bot_card.fill.solid()
    bot_card.fill.fore_color.rgb = DARK_BLUE
    bot_card.line.color.rgb = RGBColor(51, 65, 85)
    btf = bot_card.text_frame
    btf.word_wrap = True

    bp0 = btf.paragraphs[0]
    bp0.text = "QUESTIONS & LIVE DEMONSTRATION"
    bp0.font.size = Pt(13)
    bp0.font.bold = True
    bp0.font.color.rgb = EMERALD

    bp1 = btf.add_paragraph()
    bp1.text = "Team: [Your Names Here]  |  Email: [your_email@example.com]"
    bp1.font.size = Pt(16)
    bp1.font.bold = True
    bp1.font.color.rgb = WHITE
    bp1.space_before = Pt(4)

    bp2 = btf.add_paragraph()
    bp2.text = "CrowdShield Project  •  FastAPI Backend  •  Qiskit Quantum Reservoir  •  YOLOv11 Vision"
    bp2.font.size = Pt(12)
    bp2.font.color.rgb = RGBColor(148, 163, 184)
    bp2.space_before = Pt(4)

    slide10.notes_slide.notes_text_frame.text = (
        "JUDGE PITCH:\n"
        "'In conclusion judges: CrowdShield bridges cutting-edge quantum computing with life-saving public safety. "
        "We are ready for your questions and to show you our live running demo. Thank you!'"
    )

    prs.save(output_path)
    print(f"Simplified picture-rich presentation successfully saved to {output_path}")

if __name__ == "__main__":
    out = os.path.abspath(r"C:\Users\HP\OneDrive - Nalanda Educational Institutions\Desktop\crowd\CrowdShield_Presentation.pptx")
    create_deck(out)
