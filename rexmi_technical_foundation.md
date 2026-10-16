# REXMI. A ground crew for the Moon.

## Physical AI for space. Starting on the surface.

FARFIELD is developing REXMI, a wheeled quadruped for lunar missions. The design combines wheeled-leg mobility, mission autonomy and instrument access. Wheels cover traversable ground; articulated legs adapt clearance and contact placement over broken terrain. Crater access is part of the system concept.

**Reach the site. Collect the evidence. Make the next mission decision.**

## Mission roles

### Scout & recon

Map terrain, hazards and routes. Combine navigational data with resource maps so mission teams can choose both a target and an approach.

**Example:** Survey a route from a lander to a science target, flag difficult slopes and identify an alternative approach.

### Resource mapping & crater access

Reach candidate resource sites, including selected crater slopes and interiors. Ground measurements test orbital interpretations before committing equipment to in-situ resource utilization (ISRU). Polar ice is one target. Candidate payloads include spectrometers for composition and ground-penetrating radar for subsurface structure. [1-3]

**Example:** Traverse a candidate ice-bearing site and return location-tagged instrument measurements to inform where further investigation or excavation is justified.

### Supplies

Carry mission-sized instruments, equipment and tools between landing areas and work sites, reducing astronaut workload.

**Example:** Bring a science instrument and tool kit to a crew work site so astronauts can spend more time on the task.

### Inspection

Revisit surface infrastructure and scientific instruments. Compare observations across visits to identify damage, dust buildup or obstructions.

**Example:** Repeat a survey around a lander and return images for operator review.

## Current foundation

Our simulation work combines reinforcement-learning movement skills, route planning, skill switching and recovery. [4] The development path connects this software to physical robot trials and lunar environmental testing.

**The product goal: a mobile instrument platform that turns access into useful mission data.**

---

# From simulation to surface work.

## The system we’re developing

REXMI brings mobility, perception and payload operation into one mission architecture. Its intended users are mission operators, science teams and surface infrastructure providers. The goal is to reach useful sites, gather evidence and reduce the work required of astronauts and operators.

## Development focus

### Lunar mobility simulation

Planned training and evaluation cover reduced gravity, variable traction, loose terrain and actuator limits. Crater approach, descent, traverse and exit will be assessed through route completion, stability, energy use and recovery.

### Adaptive thermal control

The planned thermal architecture combines heat paths, radiators, insulation, heaters and temperature-aware operation around payload loads, sunlight and mission duration. Shadowed crater work requires a dedicated power and thermal design.

### Perception

Perception development covers terrain mapping, hazard detection and localization for navigation and instrument positioning. Science measurements will be associated with location, time and acquisition conditions.

### Dust protection

Mechanism design will address shields, seals, cable routing and lubrication for abrasive dust. Planned tests cover dust exposure, wear, vacuum and thermal cycling of mechanisms, optics and heat-rejection surfaces.

### Robot validation

Planned hardware trials will test mobility, payload operation, load carrying and inspection on representative terrain. Evaluation will cover repeatability, energy use, operator intervention and responses to localization, communication and thermal faults.

## Integration and the next proof point

Planned payload interfaces cover mounting, power, data and calibration. The next system demonstration will target a repeatable survey: reach a site, collect location-tagged data and complete the route within defined operating limits. Hardware trials and environmental testing will establish the usable mission envelope.

**Long-term vision: physical AI for space, across quadrupeds, humanoids and hybrids. REXMI is the starting point.**

## Sources

1. [NASA: Moon Water and Ices](https://science.nasa.gov/moon/moon-water-and-ices/). Polar ice and volatile distribution.
2. [NASA: Lunar Terrain Vehicle instruments](https://www.nasa.gov/news-release/nasa-selects-instruments-for-artemis-lunar-terrain-vehicle/), July 2025. Spectroscopy and subsurface radar.
3. [NASA: Lunar surface science payloads](https://science.nasa.gov/lunar-science/clps-deliveries/to2-astrobotic/). Ground measurements and orbital observations.
4. FARFIELD simulation development records and founder design direction, August-September 2026.
