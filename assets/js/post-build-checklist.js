const POST_BUILD_CHECKLIST = [
  {
    "group": "Airframe and printed structure",
    "description": "Verify the completed carbon frame, printed structure, feet, and frame fasteners.",
    "items": [
      {
        "id": "A1",
        "checkpoint": "Bottom plate is installed at the bottom of the lower-frame stack.",
        "commonErrors": [
          "Bottom plate missing or installed on the wrong side."
        ]
      },
      {
        "id": "A2",
        "checkpoint": "Lower deck is installed above the arm and hub layer.",
        "commonErrors": [
          "Upper and lower decks swapped.",
          "Lower deck upside down."
        ]
      },
      {
        "id": "A3",
        "checkpoint": "Upper deck is installed on the frame standoffs.",
        "commonErrors": [
          "Upper deck not seated on all standoffs."
        ]
      },
      {
        "id": "A4",
        "checkpoint": "Upper and lower decks sit parallel.",
        "commonErrors": [
          "Twisted frame.",
          "Cross-threaded standoff.",
          "Unevenly tightened frame screws."
        ]
      },
      {
        "id": "A5",
        "checkpoint": "All four arms are fully seated in the center hub.",
        "commonErrors": [
          "Arm partially inserted into the hub."
        ]
      },
      {
        "id": "A6",
        "checkpoint": "Arm geometry matches the intended X-frame layout.",
        "commonErrors": [
          "Arm installed in the wrong orientation."
        ]
      },
      {
        "id": "A7",
        "checkpoint": "All eight upper-to-lower frame standoff joints are secured.",
        "commonErrors": [
          "Missed standoff.",
          "Missing frame screw.",
          "Loose frame joint."
        ]
      },
      {
        "id": "A8",
        "checkpoint": "Lower-frame stack has nine M3 x 12 mm round-head screws installed.",
        "commonErrors": [
          "Missing screw.",
          "Wrong screw type."
        ]
      },
      {
        "id": "A9",
        "checkpoint": "Frame screws are snug without visible damage to the frame.",
        "commonErrors": [
          "Loose screw.",
          "Overdriven screw.",
          "Stripped hole."
        ]
      },
      {
        "id": "A10",
        "checkpoint": "Four foam feet are installed.",
        "commonErrors": [
          "Missing foam foot."
        ]
      },
      {
        "id": "A11",
        "checkpoint": "Foam feet are installed on the underside of the arms.",
        "commonErrors": [
          "Foam feet installed on the top side."
        ]
      },
      {
        "id": "A12",
        "checkpoint": "Foam feet are located near the outer end of each arm.",
        "commonErrors": [
          "Feet placed too far inboard.",
          "Feet placed unevenly."
        ]
      }
    ]
  },
  {
    "group": "Motor and propeller system",
    "description": "Verify motor installation and final propeller hardware after motor direction has been checked.",
    "items": [
      {
        "id": "M1",
        "checkpoint": "One motor is installed on each arm.",
        "commonErrors": [
          "Missing motor."
        ]
      },
      {
        "id": "M2",
        "checkpoint": "Each motor is seated flat on its motor pad.",
        "commonErrors": [
          "Motor tilted.",
          "Motor sitting on wire or debris."
        ]
      },
      {
        "id": "M3",
        "checkpoint": "Each motor lead exits inward along its arm toward the center of the aircraft.",
        "commonErrors": [
          "Motor leads routed sideways or outward."
        ]
      },
      {
        "id": "M4",
        "checkpoint": "Each motor is secured with four M3 x 8 mm screws.",
        "commonErrors": [
          "Missing motor screw.",
          "Wrong screw length."
        ]
      },
      {
        "id": "M5",
        "checkpoint": "No M3 x 10 mm motor screws are installed.",
        "commonErrors": [
          "Long motor screw installed, which can damage motor windings."
        ]
      },
      {
        "id": "M6",
        "checkpoint": "Motor screws are snug without distorting the motor base.",
        "commonErrors": [
          "Loose motor screw.",
          "Overtightened screw."
        ]
      },
      {
        "id": "M7",
        "checkpoint": "Propeller on Motor A matches the verified Motor A spin direction.",
        "commonErrors": [
          "CW and CCW propeller swapped."
        ]
      },
      {
        "id": "M8",
        "checkpoint": "Propeller on Motor B matches the verified Motor B spin direction.",
        "commonErrors": [
          "CW and CCW propeller swapped."
        ]
      },
      {
        "id": "M9",
        "checkpoint": "Propeller on Motor C matches the verified Motor C spin direction.",
        "commonErrors": [
          "CW and CCW propeller swapped."
        ]
      },
      {
        "id": "M10",
        "checkpoint": "Propeller on Motor D matches the verified Motor D spin direction.",
        "commonErrors": [
          "CW and CCW propeller swapped."
        ]
      },
      {
        "id": "M11",
        "checkpoint": "All propeller label sides face up.",
        "commonErrors": [
          "Propeller installed upside down."
        ]
      },
      {
        "id": "M12",
        "checkpoint": "All propellers are fully seated on the motor shafts.",
        "commonErrors": [
          "Propeller not fully seated."
        ]
      },
      {
        "id": "M13",
        "checkpoint": "All four propeller lock nuts are installed.",
        "commonErrors": [
          "Missing propeller nut."
        ]
      },
      {
        "id": "M14",
        "checkpoint": "All four propeller lock nuts are snug.",
        "commonErrors": [
          "Loose propeller nut."
        ]
      },
      {
        "id": "M15",
        "checkpoint": "No propeller has visible wobble or play.",
        "commonErrors": [
          "Mis-seated propeller.",
          "Loose lock nut."
        ]
      }
    ]
  },
  {
    "group": "FC/ESC stack",
    "description": "Verify the physical flight-controller and ESC stack without duplicating cable-routing checks.",
    "items": [
      {
        "id": "F1",
        "checkpoint": "ESC is installed below the flight controller.",
        "commonErrors": [
          "Stack order reversed."
        ]
      },
      {
        "id": "F2",
        "checkpoint": "Flight controller is installed above the ESC.",
        "commonErrors": [
          "FC missing.",
          "Wrong board on top."
        ]
      },
      {
        "id": "F3",
        "checkpoint": "Flight controller USB-C port is accessible.",
        "commonErrors": [
          "FC rotated incorrectly."
        ]
      },
      {
        "id": "F4",
        "checkpoint": "Flight controller orientation matches the instructions.",
        "commonErrors": [
          "FC rotated 90 or 180 degrees."
        ]
      },
      {
        "id": "F5",
        "checkpoint": "ESC orientation matches the instructions.",
        "commonErrors": [
          "ESC rotated.",
          "ESC upside down."
        ]
      },
      {
        "id": "F6",
        "checkpoint": "Silicone dampers are installed at all FC/ESC mounting points.",
        "commonErrors": [
          "Missing damper."
        ]
      },
      {
        "id": "F7",
        "checkpoint": "Dampers are fully seated.",
        "commonErrors": [
          "Damper lip not seated."
        ]
      },
      {
        "id": "F8",
        "checkpoint": "Dampers are not torn.",
        "commonErrors": [
          "Damper damaged during installation."
        ]
      },
      {
        "id": "F9",
        "checkpoint": "Four M3 x 30 mm stack screws are installed.",
        "commonErrors": [
          "Missing stack screw.",
          "Wrong screw length."
        ]
      },
      {
        "id": "F10",
        "checkpoint": "Four stack lock nuts are installed below the stack.",
        "commonErrors": [
          "Missing lock nut."
        ]
      },
      {
        "id": "F11",
        "checkpoint": "About two threads protrude below each stack lock nut.",
        "commonErrors": [
          "Stack too loose.",
          "Stack overtightened."
        ]
      },
      {
        "id": "F12",
        "checkpoint": "Dampers are not crushed solid.",
        "commonErrors": [
          "Stack overtightened."
        ]
      }
    ]
  },
  {
    "group": "Power system and battery retention",
    "description": "Verify ESC power polarity, XT60 routing, battery pad, and battery strap.",
    "items": [
      {
        "id": "P1",
        "checkpoint": "Red XT60 ring terminal is connected to ESC positive.",
        "commonErrors": [
          "Polarity reversed."
        ]
      },
      {
        "id": "P2",
        "checkpoint": "Black XT60 ring terminal is connected to ESC negative.",
        "commonErrors": [
          "Polarity reversed."
        ]
      },
      {
        "id": "P3",
        "checkpoint": "XT60 terminal screws are snug.",
        "commonErrors": [
          "Loose power terminal."
        ]
      },
      {
        "id": "P4",
        "checkpoint": "Ring terminals do not interfere with the underside JST-SH connector.",
        "commonErrors": [
          "Ring terminal blocks or contacts the connector."
        ]
      },
      {
        "id": "P5",
        "checkpoint": "XT60 battery lead exits at the rear of the aircraft.",
        "commonErrors": [
          "Battery lead exits the side or front."
        ]
      },
      {
        "id": "P6",
        "checkpoint": "Only the XT60 connector extends beyond the rear edge.",
        "commonErrors": [
          "Excess power cable hanging aft."
        ]
      },
      {
        "id": "P7",
        "checkpoint": "Battery pad is installed on the upper deck.",
        "commonErrors": [
          "Battery pad missing."
        ]
      },
      {
        "id": "P8",
        "checkpoint": "Battery pad cutouts are removed.",
        "commonErrors": [
          "Pad blocks battery-strap slots."
        ]
      },
      {
        "id": "P9",
        "checkpoint": "Battery pad is aligned with the upper-deck slots.",
        "commonErrors": [
          "Pad misaligned with strap slots."
        ]
      },
      {
        "id": "P10",
        "checkpoint": "Battery pad is fully adhered.",
        "commonErrors": [
          "Lifting edge.",
          "Poor adhesion."
        ]
      },
      {
        "id": "P11",
        "checkpoint": "Battery strap passes through the upper-deck slots.",
        "commonErrors": [
          "Strap routed around the frame instead of through the slots."
        ]
      },
      {
        "id": "P12",
        "checkpoint": "Battery strap is flat.",
        "commonErrors": [
          "Twisted strap."
        ]
      },
      {
        "id": "P13",
        "checkpoint": "Battery strap is centered on the battery pad.",
        "commonErrors": [
          "Off-center strap."
        ]
      },
      {
        "id": "P14",
        "checkpoint": "Battery strap ends are accessible from above.",
        "commonErrors": [
          "Strap trapped under hardware."
        ]
      }
    ]
  },
  {
    "group": "Raspberry Pi and companion-computer mount",
    "description": "Verify the Raspberry Pi mount, standoffs, board mounting, SIP switch, header, and soldering.",
    "items": [
      {
        "id": "R1",
        "checkpoint": "Raspberry Pi mount is installed on the upper deck.",
        "commonErrors": [
          "Mount missing."
        ]
      },
      {
        "id": "R2",
        "checkpoint": "Raspberry Pi mount arrow faces up.",
        "commonErrors": [
          "Mount upside down."
        ]
      },
      {
        "id": "R3",
        "checkpoint": "Raspberry Pi mount arrow faces forward.",
        "commonErrors": [
          "Mount backward."
        ]
      },
      {
        "id": "R4",
        "checkpoint": "Front standoffs are installed with M3 x 10 mm countersunk screws.",
        "commonErrors": [
          "Wrong screw type or length."
        ]
      },
      {
        "id": "R5",
        "checkpoint": "Rear standoffs are installed with M3 x 8 mm screws.",
        "commonErrors": [
          "Wrong screw length."
        ]
      },
      {
        "id": "R6",
        "checkpoint": "Four nylon spacers are installed under the Raspberry Pi.",
        "commonErrors": [
          "Missing spacer."
        ]
      },
      {
        "id": "R7",
        "checkpoint": "Raspberry Pi is mounted on the correct side of the mount.",
        "commonErrors": [
          "Pi mounted on the wrong side."
        ]
      },
      {
        "id": "R8",
        "checkpoint": "Raspberry Pi orientation matches the instructions.",
        "commonErrors": [
          "Pi installed backward."
        ]
      },
      {
        "id": "R9",
        "checkpoint": "Raspberry Pi is secured with four M2.5 x 8 mm screws.",
        "commonErrors": [
          "Missing screw.",
          "Wrong screw."
        ]
      },
      {
        "id": "R10",
        "checkpoint": "Raspberry Pi PCB is not bent.",
        "commonErrors": [
          "Screws overtightened."
        ]
      },
      {
        "id": "R11",
        "checkpoint": "Molex 4-pin latch header is installed in the correct footprint.",
        "commonErrors": [
          "Header missing.",
          "Header installed in wrong holes."
        ]
      },
      {
        "id": "R12",
        "checkpoint": "Molex 4-pin latch header orientation is correct.",
        "commonErrors": [
          "Header rotated 180 degrees."
        ]
      },
      {
        "id": "R13",
        "checkpoint": "SIP switch is installed in the correct footprint.",
        "commonErrors": [
          "SIP switch missing.",
          "Switch installed in wrong holes."
        ]
      },
      {
        "id": "R14",
        "checkpoint": "SIP switch orientation matches the board marking.",
        "commonErrors": [
          "Switch rotated 180 degrees."
        ]
      },
      {
        "id": "R15",
        "checkpoint": "SIP switch setting matches the assigned Team ID.",
        "commonErrors": [
          "Binary value wrong.",
          "Switch read upside down."
        ]
      },
      {
        "id": "R16",
        "checkpoint": "SIP switch is readable and accessible after assembly.",
        "commonErrors": [
          "Switch blocked by wiring."
        ]
      },
      {
        "id": "R17",
        "checkpoint": "Header and switch solder joints are complete and mechanically sound.",
        "commonErrors": [
          "Unsoldered pin.",
          "Cold joint.",
          "Cracked joint.",
          "Loose component."
        ]
      },
      {
        "id": "R18",
        "checkpoint": "No solder bridges are present between adjacent pins.",
        "commonErrors": [
          "Bridged pins."
        ]
      }
    ]
  },
  {
    "group": "GPS, compass, and camera mount assembly",
    "description": "Verify the sensor modules and printed front mount as physical end states.",
    "items": [
      {
        "id": "G1",
        "checkpoint": "GPS/compass module is installed in the printed GPS mount.",
        "commonErrors": [
          "GPS missing."
        ]
      },
      {
        "id": "G2",
        "checkpoint": "GPS/compass module is seated in the correct pocket.",
        "commonErrors": [
          "GPS shifted.",
          "GPS not fully seated."
        ]
      },
      {
        "id": "G3",
        "checkpoint": "GPS/compass module orientation matches the instructions.",
        "commonErrors": [
          "GPS rotated."
        ]
      },
      {
        "id": "G4",
        "checkpoint": "GPS/compass module is secured with four screws.",
        "commonErrors": [
          "Missing screw."
        ]
      },
      {
        "id": "G5",
        "checkpoint": "GPS/compass module is secured with four lock nuts.",
        "commonErrors": [
          "Missing lock nut."
        ]
      },
      {
        "id": "G6",
        "checkpoint": "GPS/compass hardware is snug without bending the PCB.",
        "commonErrors": [
          "Loose hardware.",
          "Overtightened PCB."
        ]
      },
      {
        "id": "G7",
        "checkpoint": "Camera PCB is installed in the printed camera mount.",
        "commonErrors": [
          "Camera missing."
        ]
      },
      {
        "id": "G8",
        "checkpoint": "Camera lens is centered in the square opening.",
        "commonErrors": [
          "Lens offset.",
          "Lens blocked."
        ]
      },
      {
        "id": "G9",
        "checkpoint": "Camera PCB is seated flat against the mount.",
        "commonErrors": [
          "PCB tilted.",
          "PCB trapped on debris."
        ]
      },
      {
        "id": "G10",
        "checkpoint": "Camera PCB orientation matches the instructions.",
        "commonErrors": [
          "Camera rotated.",
          "Camera backward."
        ]
      },
      {
        "id": "G11",
        "checkpoint": "Camera connector retainer is closed.",
        "commonErrors": [
          "Retainer open.",
          "Retainer damaged."
        ]
      },
      {
        "id": "G12",
        "checkpoint": "Camera/GPS mount is installed on the aircraft.",
        "commonErrors": [
          "Mount missing."
        ]
      },
      {
        "id": "G13",
        "checkpoint": "Camera/GPS mount is installed in the correct location.",
        "commonErrors": [
          "Mount shifted.",
          "Mount installed in wrong position."
        ]
      },
      {
        "id": "G14",
        "checkpoint": "Camera/GPS mount orientation matches the instructions.",
        "commonErrors": [
          "Mount backward."
        ]
      },
      {
        "id": "G15",
        "checkpoint": "Four M3 x 25 mm standoffs are installed for the Camera/GPS mount.",
        "commonErrors": [
          "Missing standoff."
        ]
      },
      {
        "id": "G16",
        "checkpoint": "Eight M3 x 12 mm socket-head screws secure the Camera/GPS mount.",
        "commonErrors": [
          "Missing screw.",
          "Wrong screw length."
        ]
      }
    ]
  },
  {
    "group": "Harnesses, connectors, and cable routing",
    "description": "Verify connector seating, cable orientation, and routing clearances.",
    "items": [
      {
        "id": "W1",
        "checkpoint": "Each motor connector is plugged into an ESC motor port.",
        "commonErrors": [
          "Motor unplugged."
        ]
      },
      {
        "id": "W2",
        "checkpoint": "Each motor connector is fully seated.",
        "commonErrors": [
          "Partially seated connector."
        ]
      },
      {
        "id": "W3",
        "checkpoint": "Motor wires are restrained along the arms.",
        "commonErrors": [
          "Loose wire near propeller arc."
        ]
      },
      {
        "id": "W4",
        "checkpoint": "Zip ties are present at the required motor-wire retention points.",
        "commonErrors": [
          "Missing zip tie."
        ]
      },
      {
        "id": "W5",
        "checkpoint": "Zip tie tails are trimmed flush.",
        "commonErrors": [
          "Sharp untrimmed tail."
        ]
      },
      {
        "id": "W6",
        "checkpoint": "Camera ribbon is inserted into the camera connector.",
        "commonErrors": [
          "Ribbon disconnected at camera."
        ]
      },
      {
        "id": "W7",
        "checkpoint": "Camera ribbon contacts face the correct direction at the camera connector.",
        "commonErrors": [
          "Ribbon reversed at camera."
        ]
      },
      {
        "id": "W8",
        "checkpoint": "Camera ribbon is inserted into the Raspberry Pi CSI connector.",
        "commonErrors": [
          "Ribbon disconnected at Raspberry Pi."
        ]
      },
      {
        "id": "W9",
        "checkpoint": "Camera ribbon contacts face the HDMI port at the Raspberry Pi.",
        "commonErrors": [
          "Ribbon reversed at Raspberry Pi."
        ]
      },
      {
        "id": "W10",
        "checkpoint": "Raspberry Pi CSI retainer is closed.",
        "commonErrors": [
          "Retainer open.",
          "Retainer damaged."
        ]
      },
      {
        "id": "W11",
        "checkpoint": "Camera ribbon has a smooth bend with slack.",
        "commonErrors": [
          "Ribbon creased.",
          "Ribbon pulled tight."
        ]
      },
      {
        "id": "W12",
        "checkpoint": "GPS cable is connected to the GPS/compass module.",
        "commonErrors": [
          "GPS cable missing or loose."
        ]
      },
      {
        "id": "W13",
        "checkpoint": "GPS cable is connected to the FC port marked GPS.",
        "commonErrors": [
          "GPS cable in wrong FC port."
        ]
      },
      {
        "id": "W14",
        "checkpoint": "FC/RPi cable is connected to the FC port marked TELEM.",
        "commonErrors": [
          "TELEM cable in wrong FC port."
        ]
      },
      {
        "id": "W15",
        "checkpoint": "GPS cable is routed under the Raspberry Pi as shown in the instructions.",
        "commonErrors": [
          "Cable routed over the top.",
          "Cable routed through a snag area."
        ]
      },
      {
        "id": "W16",
        "checkpoint": "FC/RPi cable is routed under the Raspberry Pi as shown in the instructions.",
        "commonErrors": [
          "Cable routed over the top.",
          "Cable routed through a snag area."
        ]
      },
      {
        "id": "W17",
        "checkpoint": "No cable is pinched under the Raspberry Pi mount.",
        "commonErrors": [
          "Pinched cable."
        ]
      },
      {
        "id": "W18",
        "checkpoint": "No cable enters any propeller arc.",
        "commonErrors": [
          "Loose cable near motor or propeller."
        ]
      },
      {
        "id": "W19",
        "checkpoint": "FC/ESC cable is connected at both ends.",
        "commonErrors": [
          "Cable missing or loose."
        ]
      },
      {
        "id": "W20",
        "checkpoint": "JST-SH end of the FC/ESC cable is connected to the ESC.",
        "commonErrors": [
          "Cable ends swapped."
        ]
      },
      {
        "id": "W21",
        "checkpoint": "JST-GH end of the FC/ESC cable is connected to the FC.",
        "commonErrors": [
          "Cable ends swapped."
        ]
      },
      {
        "id": "W22",
        "checkpoint": "JST-SH contact orientation is correct at the ESC.",
        "commonErrors": [
          "JST-SH connector upside down."
        ]
      }
    ]
  },
  {
    "group": "Firmware, parameters, calibration, and functional checks",
    "description": "Verify software state, calibration state, camera stream, and recorded motor-test outcomes.",
    "items": [
      {
        "id": "S1",
        "checkpoint": "Mission Planner connects to the FC at 921600 baud.",
        "commonErrors": [
          "Wrong COM port.",
          "Wrong baud rate."
        ]
      },
      {
        "id": "S2",
        "checkpoint": "FC reports ArduCopter firmware.",
        "commonErrors": [
          "Wrong vehicle firmware."
        ]
      },
      {
        "id": "S3",
        "checkpoint": "FC reports Copter V4.6.3 OFFICIAL.",
        "commonErrors": [
          "Wrong firmware version."
        ]
      },
      {
        "id": "S4",
        "checkpoint": "HAMR II parameter file is loaded and written.",
        "commonErrors": [
          "File loaded but not written.",
          "Wrong parameter file."
        ]
      },
      {
        "id": "S5",
        "checkpoint": "FC reconnects after parameter write and reboot.",
        "commonErrors": [
          "Reboot skipped."
        ]
      },
      {
        "id": "S6",
        "checkpoint": "FRAME_CLASS equals 1.",
        "commonErrors": [
          "Wrong frame class."
        ]
      },
      {
        "id": "S7",
        "checkpoint": "FRAME_TYPE equals 12.",
        "commonErrors": [
          "Wrong frame type."
        ]
      },
      {
        "id": "S8",
        "checkpoint": "Accelerometer calibration is complete.",
        "commonErrors": [
          "Calibration skipped or failed."
        ]
      },
      {
        "id": "S9",
        "checkpoint": "Aircraft sits level when Mission Planner shows level attitude.",
        "commonErrors": [
          "Calibrated on uneven or soft surface."
        ]
      },
      {
        "id": "S10",
        "checkpoint": "Artificial horizon rolls correctly when the aircraft is rolled.",
        "commonErrors": [
          "Incorrect roll response."
        ]
      },
      {
        "id": "S11",
        "checkpoint": "Artificial horizon pitches correctly when the aircraft is pitched.",
        "commonErrors": [
          "Incorrect pitch response."
        ]
      },
      {
        "id": "S12",
        "checkpoint": "Heading changes correctly when the aircraft is yawed.",
        "commonErrors": [
          "Incorrect heading response."
        ]
      },
      {
        "id": "S13",
        "checkpoint": "Compass calibration is complete.",
        "commonErrors": [
          "Calibration skipped or failed."
        ]
      },
      {
        "id": "S14",
        "checkpoint": "Compass status is healthy in Mission Planner.",
        "commonErrors": [
          "Poor calibration.",
          "Magnetic interference."
        ]
      },
      {
        "id": "S15",
        "checkpoint": "Battery monitor voltage matches the measured total 4S pack voltage.",
        "commonErrors": [
          "Single-cell voltage entered.",
          "Guessed value used."
        ]
      },
      {
        "id": "S16",
        "checkpoint": "Camera video stream is visible over the aircraft hotspot.",
        "commonErrors": [
          "Wrong hotspot.",
          "Camera disconnected.",
          "Raspberry Pi issue."
        ]
      },
      {
        "id": "S17",
        "checkpoint": "Camera focus is sharp on far-side classroom objects.",
        "commonErrors": [
          "Camera focused too close."
        ]
      },
      {
        "id": "S18",
        "checkpoint": "Issued microSD card is not left installed after focus check.",
        "commonErrors": [
          "Card left in aircraft instead of returned."
        ]
      },
      {
        "id": "S19",
        "checkpoint": "Motor-test result confirms correct motor order for Motors A, B, C, and D.",
        "commonErrors": [
          "Wrong motor output mapping."
        ]
      },
      {
        "id": "S20",
        "checkpoint": "Motor-test result confirms correct spin direction for Motors A, B, C, and D.",
        "commonErrors": [
          "Motor direction wrong."
        ]
      },
      {
        "id": "S21",
        "checkpoint": "Motors start smoothly during the low-power motor test.",
        "commonErrors": [
          "Stuttering motor.",
          "Grinding motor.",
          "Bad motor connection."
        ]
      }
    ]
  },
  {
    "group": "Final accountability and release",
    "description": "Use this section only after the subsystem checks above pass.",
    "items": [
      {
        "id": "X1",
        "checkpoint": "Issued microSD card and borrowed focus tool are accounted for.",
        "commonErrors": [
          "Issued item left in aircraft.",
          "Tool not returned."
        ]
      },
      {
        "id": "X2",
        "checkpoint": "Any failed checkpoint has been corrected and rechecked.",
        "commonErrors": [
          "Known discrepancy carried forward without reinspection."
        ]
      },
      {
        "id": "X3",
        "checkpoint": "Faculty release signature is complete before prop-on run or flight.",
        "commonErrors": [
          "Build completion treated as flight approval."
        ]
      }
    ]
  }
];

function checklistEscape(value) {
  return String(value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[ch]));
}

function renderPostBuildChecklist() {
  const root = document.querySelector('[data-post-build-checklist]');
  if (!root) return;

  const totalItems = POST_BUILD_CHECKLIST.reduce((sum, group) => sum + group.items.length, 0);
  const summary = document.querySelector('[data-post-build-checklist-summary]');
  if (summary) {
    summary.textContent = `${POST_BUILD_CHECKLIST.length} subsystem groups, ${totalItems} atomic checkpoints.`;
  }

  root.innerHTML = POST_BUILD_CHECKLIST.map((group, groupIndex) => {
    const rows = group.items.map(item => {
      const errors = (item.commonErrors || []).map(error => `<li>${checklistEscape(error)}</li>`).join('');
      return `
        <tr>
          <td class="check-id"><strong>${checklistEscape(item.id)}</strong></td>
          <td>${checklistEscape(item.checkpoint)}</td>
          <td class="check-cell"><label><input type="checkbox" aria-label="Pass ${checklistEscape(item.id)}"></label></td>
          <td class="check-cell"><label><input type="checkbox" aria-label="Fix needed ${checklistEscape(item.id)}"></label></td>
          <td><ul class="checklist-error-list">${errors}</ul></td>
        </tr>`;
    }).join('');

    return `
      <details class="checklist-group" ${groupIndex === 0 ? 'open' : ''}>
        <summary>
          <span>${checklistEscape(group.group)}</span>
          <span class="badge">${group.items.length} checks</span>
        </summary>
        <p class="muted">${checklistEscape(group.description)}</p>
        <table class="matrix post-build-table" aria-label="${checklistEscape(group.group)} checklist">
          <thead>
            <tr>
              <th>ID</th>
              <th>Checkpoint</th>
              <th>Pass</th>
              <th>Fix needed</th>
              <th>Common errors</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </details>`;
  }).join('');
}

document.addEventListener('DOMContentLoaded', renderPostBuildChecklist);
