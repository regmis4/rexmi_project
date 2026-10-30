# REXMI project

The controlled product vision is [REXMI Mission Vision](rexmi_vision.pdf), baseline v1.0 (29 October 2026).

- [Editable source](docs/rexmi_vision.md)
- [Frozen mission requirements](configs/mission_baseline.json)
- [Chrono implementation and evidence](https://github.com/regmis4/rexmi_chrono)
- [Existing learning and navigation](https://github.com/regmis4/rexmi_rl)

The baseline targets 40-degree lunar ascent/descent, Shackleton interior science access and return, 25 kg total deployed mass, Go2W geometry/torque limits, retained initial wheel diameter/width, and battery sorties supported by external power posts. These are requirements, not demonstrated lunar performance.

Edit the Markdown and JSON together when requirements change. Regenerate the PDF with `python scripts/build_vision_pdf.py` (requires ReportLab and DejaVu fonts); render and inspect all pages before accepting a revision. The existing two-page technical brief remains website collateral. The four-page vision governs engineering scope and evidence claims.
