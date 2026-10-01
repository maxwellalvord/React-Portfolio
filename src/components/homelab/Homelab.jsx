import React from 'react'
import './homelab.css'
import { motion } from 'framer-motion'
import { containerVariants, itemVariants } from '../../utils/animations'
import SectionHeading from '../SectionHeading'

const services = [
  { name: 'AMP game servers', note: 'Top priority, never stopped' },
  { name: 'Immich photo library', note: 'Self-hosted, with ML features' },
  { name: 'Docker stacks', note: 'Compose-managed services' }
]

const tiers = [
  { temp: '85°C', label: 'Warn', action: 'Stop Immich ML · cap CPU at 15 W', tone: 'warn' },
  { temp: '95°C', label: 'Critical', action: 'Cap CPU at 10 W · game servers stay up', tone: 'crit' },
  { temp: '55°C', label: 'Cool', action: 'Stable 15 min → restore 20 W, restart ML', tone: 'cool' }
]

const Homelab = () => {
  return (
    <section id='homelab'>
      <SectionHeading eyebrow="Owning the Whole Stack" title="My Homelab" />

      <motion.div
        className="container homelab__container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <motion.div className="homelab__topology" variants={itemVariants} aria-label="Homelab network topology">
          <div className="topo__node topo__node--edge">
            <small>Edge</small>
            <h4>Internet</h4>
          </div>
          <span className="topo__link" />
          <div className="topo__node">
            <small>Firewall / Router</small>
            <h4>pfSense</h4>
            <p>VLAN segmentation to keep networks isolated</p>
          </div>
          <span className="topo__link" />
          <div className="topo__node">
            <small>Hypervisor</small>
            <h4>Proxmox VE</h4>
            <p>Linux VMs and containers on one host</p>
          </div>
          <span className="topo__link" />
          <div className="topo__services">
            {services.map(({ name, note }) => (
              <div key={name} className="topo__service">
                <h4>{name}</h4>
                <p>{note}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="homelab__highlights">
          <motion.article className="homelab__card homelab__card--thermal" variants={itemVariants}>
            <small className="homelab__eyebrow">Bash · cron every 2 min</small>
            <h3>Thermal Guard</h3>
            <p>
              A priority-aware script that keeps the server safe under load. It reads both the CPU package
              and PECI sensors, acts on whichever is hotter, sheds the lowest-priority workload first, and
              throttles power through Intel RAPL instead of taking services down.
            </p>
            <ul className="thermal__tiers">
              {tiers.map(({ temp, label, action, tone }) => (
                <li key={label} className={`thermal__tier thermal__tier--${tone}`}>
                  <span className="thermal__temp">{temp}</span>
                  <span className="thermal__label">{label}</span>
                  <span className="thermal__action">{action}</span>
                </li>
              ))}
            </ul>
          </motion.article>

          <motion.article className="homelab__card" variants={itemVariants}>
            <small className="homelab__eyebrow">Operations</small>
            <h3>Scheduled Maintenance</h3>
            <p>
              A scheduled maintenance routine on a weekly, monthly and quarterly cadence, tracked in a state file
              so no check is skipped. It includes real restore tests that restore backups to a scratch location,
              to prove they actually come back, not just that the backup job ran.
            </p>
          </motion.article>
        </div>
      </motion.div>
    </section>
  )
}

export default Homelab
