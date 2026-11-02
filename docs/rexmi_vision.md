# REXMI | Mission vision
FARFIELD Robotics • Baseline v1.0 • 29 October 2026

## Wheels for distance. Legs for access.
FARFIELD Robotics develops physical AI for space. REXMI is its first platform: a wheeled quadruped that carries instruments to difficult lunar sites, gathers location-tagged measurements, and returns to supporting infrastructure. Wheels cover traversable ground; articulated legs change posture, clearance and contact placement. Autonomy combines locomotion, terrain assessment, route planning and recovery. [1]

The immediate focus is Shackleton crater access. GPR and spectrometer payloads will investigate subsurface structure and composition, helping science teams test orbital interpretations and prioritize further exploration. Instrument measurements support resource assessment; detection of accessible, extractable ice is not assumed.

## Frozen mission target
Develop and validate a 25 kg total-mass REXMI system capable of controlled descent and ascent on selected lunar-regolith terrain up to 40 degrees, carrying a configured science payload into Shackleton crater and returning to a power post with sufficient reserve to reconnect.

This is the development target, not an achieved lunar capability. Route coordinates, target depth, soil envelope, allowable intervention and resource margins must be specified before a route-specific claim is accepted. Full floor-and-return capability requires its own route and endurance evidence.

| Requirement | Baseline decision |
|---|---|
| Destination | Lunar south pole; Shackleton crater interior access and return |
| Mobility target | Up to 40 degrees in ascent and descent; cross-slope capability characterized separately |
| Total deployed mass | 25 kg including robot, battery, instruments, thermal/dust hardware and docking hardware |
| Mechanical baseline | Go2W geometry, articulation and joint torque limits; versioned model and actuator audit |
| Initial wheel study | Retain baseline diameter and width; evaluate a mesh-wheel construction within that envelope |
| Payload role | GPR, spectroscopy and navigation/science sensors; payload allocation remains to be closed |
| Energy architecture | Battery-powered sorties; external power posts provide recharge and connected lunar-night support |
| Validation approach | Chrono credibility benchmark, physical wheel/leg rig, then integrated robot tests |

## Operating cycle
Connect and recharge → verify post and return reserve → depart → descend and survey → ascend and return → reconnect → transfer data and maintain thermal survival.

The design succeeds when useful science data and the robot return together. Maximum slope alone is not the mission metric.

<!-- PAGEBREAK -->
# System architecture
Make mobility, science and infrastructure one executable mission.

## Mobility and the first design variable
Use the Go2W baseline as a controlled starting point. Preserve link geometry and joint torque limits while closing the 25 kg mass budget and its center-of-mass/inertia distribution. Do not add payload on top of the total mass allowance. Imported software limits require reconciliation with hardware torque-speed, continuous-duty and thermal limits; a peak torque is not a continuous operating rating. [2]

First compare the baseline wheel with a mesh-wheel candidate at the same diameter and width. Measure contact shape, compliance, mass, traction, sinkage, torque and durability. A triangle-mesh collision surface is not a physically compliant wire-mesh wheel. Use a calibrated compliant or structural wheel model when deformation changes the result. Change wheel dimensions only after evidence shows why the retained envelope is inadequate, and record the change as a new baseline.

## Science and autonomy
Provide controlled mounting, power, data, timing and calibration interfaces for the selected instruments. Budget payload mass, acquisition power and dwell time before setting sortie range. Associate measurements with pose, time, uncertainty and operating conditions. A GPR or spectrometer selection remains an engineering trade, not a procurement commitment.

Retain Isaac-based training and regression. Add Chrono evaluation for robot-soil interaction. Feed observed progress, wheel slip, burial and recovery cost into route decisions. Demonstrate deployable localization and terrain sensing under shadow and artificial lighting. Ground-truth pose and inaccessible overhead terrain observations may support isolated mobility experiments, but cannot establish deployable autonomy.

## Battery sorties and power posts
Size onboard usable energy for the entire sortie: approach, descent, science stops, ascent, recovery, navigation/computing, communications, heaters, docking attempts and reserve. Prioritize return capability as conditions worsen. Do not credit regenerative braking or post availability until demonstrated or supplied by an approved interface specification.

The post interface must define position/access, connector alignment, mechanical capture, voltage/current, charge control, dust tolerance, communications and reconnect behavior. Lunar-night survival depends on the post's available energy and power plus REXMI's connected thermal design. The post's generation/storage, nighttime availability and service provider are unresolved external dependencies; connection alone does not establish survival.

## System closure
Maintain linked mass, energy, thermal, communications and endurance budgets. All flight-carried additions remain inside 25 kg. Demonstrate the ability to hold/brake on slopes, restart, retreat from weak soil and reconnect with degraded localization. Set an abort/return policy before extending the sortie. Infrastructure failure scenarios require explicit mission responses.

<!-- PAGEBREAK -->
# Evidence before expansion
Each stage ends with a reproducible result and a decision.

| Gate | Work and completion evidence |
|---|---|
| G0 • Baseline | Freeze configuration, 25 kg allocation, 40-degree target, mission sequence and claim boundaries. Record missing hardware and post-interface inputs. |
| G1 • Model credibility | Install a pinned Chrono build; run a documented demo; reproduce a published Earth-gravity wheel benchmark; assess numerical sensitivity and prediction error. A running demo alone does not pass validation. |
| G2 • Local hardware | Use a laboratory arm/carriage carrying the actual wheel/leg. Characterize soil, fixture behavior and instruments. Fit on calibration trials, then predict untouched test conditions. |
| G3 • Mobility envelope | Compare fixed-posture rolling, active posture and stepping. Map ascent/descent/cross-slope performance, braking, restart, turning and recovery across soil states. Include failure cases. |
| G4 • Site access | Evaluate connected Shackleton routes at real dimensions using orbital terrain, unresolved-hazard scenarios and calibrated mobility predictions. Close return energy and route uncertainty. |
| G5 • Integrated mission | Demonstrate the configured robot carrying a representative payload through an analog sortie and reconnecting. Validate sensing, endurance, dust and thermal functions within their declared test environments. |

## First credibility experiment
Use Chrono CRM as the principal deformable-soil reference; SCM can support fast studies after correlation. First establish that the installed model runs reproducibly. Then reproduce published wheel traction versus slip at Earth gravity, recording geometry, soil state, loading, numerical settings and comparison errors. Published Chrono/NASA SLOPE correlation is a starting reference; it is not validation of this robot or every polar soil. [3,4]

## Physical wheel/leg rig
Control wheel speed, horizontal travel and normal load. Measure force/torque, independent travel, sinkage and actuator response with synchronized logging. Account for fixture compliance and avoid prescribing wheel height in a way that suppresses burial. Document grain distribution, density, strength and preparation; test fresh and disturbed beds. Use separate calibration and held-out validation trials. [5]

Earth testing constrains the model. Lunar prediction must apply reduced gravity to both robot and soil and retain extrapolation uncertainty; unloading the robot alone does not reproduce lunar soil behavior. Whole-body stability and multi-contact load transfer still require a complete robot test. [3]

## Success and stop criteria
For each declared route/configuration: reach the science target, acquire usable data, return and reconnect within time, energy, thermal and actuator limits, with no tip-over or unrecoverable burial. Define allowable intervention and reserve before evaluation. Report failure frequency, prediction error and uncertainty separately. Where site probabilities are unsupported, publish bounded operating envelopes rather than a fabricated mission-success percentage.

<!-- PAGEBREAK -->
# Execution charter
One vision, traceable claims, evidence-driven changes.

## What exists; what must be demonstrated
Current project evidence includes rigid-terrain simulation, learned locomotion and an archived continuous procedural-crater descent/ascent. The reported 40-degree trials need a configuration and measured-grade record. These results establish a development foundation. Regolith performance, the configured 25 kg system, real-scale Shackleton access and connected lunar-night survival remain validation objectives. [2]

Shackleton is approximately 21 km wide and 4 km deep. Its terrain cannot be represented for endurance purposes by a small bowl with similar slope. Use LOLA/PGDA elevations, effective resolution and error products; refine covered areas with higher-resolution data. Use ShadowCam/LROC observations for resolvable hazards and Diviner/illumination products for environmental context. Soil strength and subpixel hazards remain uncertain. [6,7]

## Priorities and ownership
The first execution package is a reproducible Chrono installation, recorded demonstration, published-benchmark manifest and numerical verification plan. In parallel, define the wheel/leg rig, instrument calibration and soil preparation. Subsequent work closes hardware correlation, the articulation comparison, candidate routes and post-interface budgets. No schedule bypasses a failed validation gate.

The differentiator to prove is whether articulated wheeled legs increase useful access or recoverability enough to justify their mass, power and complexity. Maintain matched comparisons and report where articulation hurts as well as where it helps. Grants and proposals should fund measurable risk retirement and useful science access.

## Authoritative records
This document and its editable source in rexmi_project define the product vision. The accompanying mission_baseline.json stores the fixed requirements. rexmi_rl owns the existing training/navigation baseline. rexmi_chrono owns model configuration, numerical verification, benchmark provenance and terramechanics evidence. Hardware records own measured geometry, actuator characterization and test results.

Change the frozen mass, slope, geometry, torque envelope, wheel dimensions or power architecture only through an explicit revision with rationale and affected evidence identified. Update this source and regenerate the PDF together. Implementation reports link back to the baseline version; progress does not silently change requirements.

## Open decisions that control feasibility
Payload/battery/thermal mass split; actual wheel dimensions and compliance; continuous torque-speed limits; chosen soil envelope; mission coordinates/depth and return reserve; available science dwell time; post location, electrical interface and nighttime energy; communication coverage; thermal survival design. Resolve these through measurements and interface agreements, not optimistic defaults.

## Source register
[1] FARFIELD website content and technical brief, rexmi_project commit 0f546b5; founder mission decisions, 29 October 2026. These define intent, not verified performance.

[2] rexmi_rl: Go2W URDF/actuator configuration; crater_west_loop_2026-10-25; chrono_lunar_mobility_plan. Record full hashes in the baseline manifest.

[3] Hu et al., Journal of Field Robotics (2025): https://aschepelmann.github.io/papers/JFR2025.pdf

[4] Chrono terrain models: https://api.projectchrono.org/vehicle_terrain.html

[5] NASA Lunar Regolith Simulant User's Guide, TM-20240011783: https://ntrs.nasa.gov/citations/20240011783

[6] NASA Shackleton geometry: https://svs.gsfc.nasa.gov/4716 ; NASA PGDA: https://pgda.gsfc.nasa.gov/products/90

[7] Lunar south-pole atlas and linked original products: https://www.lpi.usra.edu/lunar/lunar-south-pole-atlas/

[8] Credibility framework: NASA-STD-7009B, https://standards.nasa.gov/node/263 . Use its verification/validation discipline; no NASA certification or endorsement is implied.
